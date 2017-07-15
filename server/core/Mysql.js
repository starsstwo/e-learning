/* @flow */
import mysql from 'mysql'
import config from '../config'
import UtilCore from './UtilCore'

// SQLパラメータ置き換え用仮文字列
const dummyParam = '?'
const conf = {
  whereString: ' WHERE ',
  leftParenthesis: '(',
  rightParenthesis: ')',
  commma: ',',
  andString: ' AND ',
  orString: ' OR '
}

type MakeSqlResult = {
  sql: string,
  params: any[]
}

type JoinOption = {
  type: string,
  where: string,
  table: string
}

const poolConnect = mysql.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
})
class Mysql {

  /**
   * コネクションの取得
   * @static
   * @async
   * @return {any} MYSQLコネクション
   */
  static async getConnection(): Promise < any > {
    return new Promise((resolve) => {
      poolConnect.getConnection((err, connection) => {
        if (err) {
          return resolve(null)
        }

        resolve(connection)
      })
    })
  }

  /**
   * SQLの実行
   * @static
   * @async
   * @param {string} sql SQL文成形
   * @param {mixed} params パラメーター
   * @return {any} SQLの実行の結果
   */
  static async exeMysql(sql: string, params: mixed): Promise < any > {
    // コネクションの取得
    const connection = await Mysql.getConnection()
    if (connection === null) {
      throw new Error('コネクションの取得に失敗しました。')
    }

    return new Promise((resolve, reject) => {
      console.log(sql, params)
      // SQLを実行する
      connection.query(sql, params, (err, rows) => {
        if (err) {
          console.error(err)
          // コネクションをリリース
          connection.release()
          return reject(err)
        }

        // コネクションをリリース
        connection.release()
        console.log(rows)
        resolve(rows)
      })
    })
  }

  /**
   * 通常のSQL or COUNTSQLでベースのSQL文の切り分け
   * @static
   * @param {string} type クエリタイプ
   * @param {string} table テーブル名
   * @param {string} column  カラム
   * @param {any} joinOption JOINオプション
   * @return {string} SELECT文成形
   */
  static makeSelectBaseSql(type: string, table: string, column: string, joinOption: JoinOption[] | null = null): string {
    let baseSql = ''

    switch (type) {
      case 'select':
        baseSql = 'SELECT ' + column + ' FROM ' + table
        break

      case 'count':
        baseSql = 'SELECT COUNT(' + column + ') as count FROM ' + table
        break
    }

    //  joinクエリの場合、セット
    if (UtilCore.isExistArray(joinOption) && joinOption !== null) {
      joinOption.forEach((join) => {
        baseSql += ' ' + join.type + ' ' + join.table
        baseSql += ' ON ' + join.where
      })
    }

    return baseSql
  }

  /**
   * WHERE文成形
   * @static
   * @param {any} where 検索条件
   * @param {boolean} isOR ORフラグ
   */
  static makeWhereSql(where: any, isOR ? : boolean): {
    whereValue: string,
    params: any
  } {
    let whereValue = ''
    let params = []
    const count = Object.keys(where).length
    // WHERE句がない場合は、リターン
    if (count === 0) {
      return {
        whereValue: whereValue,
        params: params
      }
    }
    let key = ''
    let sign = ''
    let value = ''
    let lastCount = 0

    for (key in where) {
      // ORの場合は、WHEREのORを生成する
      if (key === 'OR') {
        const orWhereSql = Mysql._makeOrWhereSql(where[key])

        params = params.concat(orWhereSql.params)
        whereValue = whereValue + orWhereSql.whereValue
      } else if (key === 'AND') {
        const andArray = where[key]

        if (UtilCore.isExistArray(andArray) === false) {
          continue
        }

        const andLength = andArray.length
        let andCount = 0

        whereValue = whereValue + conf.leftParenthesis

        andArray.forEach((andValue) => {
          const subWhereSql = Mysql.makeWhereSql(andValue)

          params = params.concat(subWhereSql.params)
          if (andCount !== andLength - 1) {
            whereValue = whereValue + subWhereSql.whereValue + conf.andString
          } else {
            whereValue = whereValue + subWhereSql.whereValue
          }
          andCount = andCount + 1
        })
        whereValue = whereValue + conf.rightParenthesis
      } else {
        // where句の整形
        sign = where[key].sign.toUpperCase()
        // 符号がBETWEENの場合
        if (sign === 'BETWEEN') {
          value = dummyParam
          whereValue += key + ' BETWEEN ' + value + ' AND ' + value
          params.push(where[key].value[0])
          params.push(where[key].value[1])
        } else if (sign === 'LIKE') {
          // LIKEの場合は "%キーワード%" の形式のWHERE文を追加する
          whereValue += key + ' LIKE "%' + where[key].value + '%" '
        } else if (sign === 'LEFTLIKE') {
          // LEFTLIKEの場合は "キーワード%" の形式のWHERE文を追加する
          whereValue += key + ' LIKE "' + where[key].value + '%" '
        } else if (sign === 'RIGHTLIKE') {
          // RIGHTLIKEの場合は "%キーワード" の形式のWHERE文を追加する
          whereValue += key + ' LIKE "%' + where[key].value + '" '
        } else if (sign === 'BETWEEN OR') {
          // 符号が'BETWEEN OR'の場合は、BETWEENにて複数の範囲を指定する
          // (例: WHERE (followerCount BETWEEN 100 AND 200 OR followerCount BETWEEN 1000 AND 2000))

          whereValue += '('

          where[key].value.forEach((elem, index) => {
            whereValue += key + ' '

            if (elem.sign === 'BETWEEN') {
              whereValue += 'BETWEEN ' + elem.value[0] + ' AND ' + elem.value[1]
            } else {
              whereValue += elem.sign + elem.value
            }

            if (index !== where[key].value.length - 1) {
              whereValue += ' OR '
            }
          })

          whereValue += ')'
        } else if (sign === 'NOT NULL') {
          // NOT NULLの場合は、'key IS NOT NULL'の形式のWHERE文を追加する
          whereValue += key + ' IS NOT NULL '
        } else if (sign === 'IN') {
          // 符号がIN
          whereValue += key + ' IN ('
          const values = where[key].value

          // 値が配列の場合
          if (values instanceof Array) {
            for (let index = 0; index < values.length; index = index + 1) {
              // 1番目のパラメータ以外にはカンマをつける
              if (index !== 0) {
                whereValue += ', '
              }
              value = dummyParam
              params.push(values[index])
              whereValue += value
            }
          } else {
            // 値が配列でない場合
            value = dummyParam
            params.push(values)
            whereValue += value
          }
          whereValue += ')'
        } else {
          value = dummyParam
          params.push(where[key].value)
          whereValue += key + ' ' + sign + ' ' + value
        }
      }

      if (lastCount !== count - 1) {
        if (isOR !== true) {
          whereValue += conf.andString
        } else {
          whereValue += conf.orString
        }
      }

      lastCount = lastCount + 1
    }
    return {
      whereValue: whereValue,
      params: params
    }
  }

  /**
   * WHEREのOR文成形(Valueを直接セット)
   * @static
   * @param {any[]} orWhere OR条件配列
   * @returns {whereValue: string, params: any[]}
   */
  static _makeOrWhereSql(orWhere: any[]): {
    whereValue: string,
    params: any[]
  } {
    let whereSql = ''
    let params = []

    if (!orWhere || orWhere.length === 0) {
      return {
        whereValue: whereSql,
        params: params
      }
    }

    whereSql = conf.leftParenthesis
    let lastCount = 0
    const count = orWhere.length

    // WHEREのOR文成形を生成
    orWhere.forEach((where) => {
      const subWhereSql = Mysql.makeWhereSql(where, true)

      params = params.concat(subWhereSql.params)
      whereSql = whereSql + subWhereSql.whereValue

      if (lastCount !== count - 1) {
        whereSql = whereSql + conf.orString
      } else {
        whereSql = whereSql + conf.rightParenthesis
      }

      lastCount = lastCount + 1
    })
    return {
      whereValue: whereSql,
      params: params
    }
  }

  /**
   * SELECT文成形
   * @static
   * @param  {string} table テーブル名
   * @param  {string} column  カラム
   * @param  {any} where 検索条件
   * @param  {string} type クエリタイプ
   * @param  {any} joinOption JOINオプション
   * @return {MakeSqlResult} SELECT文成形
   */
  static makeSelectSql(table: string, column: string, where: any, type: string = 'select', joinOption: JoinOption[] | null = null): MakeSqlResult {
    const baseSql = Mysql.makeSelectBaseSql(type, table, column, joinOption)
    // パラメータ格納用配列
    let params = []
    // function内変数
    let selectSql = baseSql
    // WHERE句があるか
    if (Object.keys(where).length > 0) {
      selectSql = selectSql + conf.whereString
      const whereSql = Mysql.makeWhereSql(where, false)

      params = params.concat(whereSql.params)
      selectSql = selectSql + whereSql.whereValue
    }
    return {
      sql: selectSql,
      params: params
    }
  }

  /**
   * SELECT処理
   * @static
   * @async
   * @param  {string} table テーブル名
   * @param  {string} column  カラム
   * @param  {any} where 検索条件
   * @param  {string} type クエリタイプ
   * @param  {any} options オプション
   * @param  {any} joinOption JOINオプション
   * @return {any[]} 結果
   */
  static async select(table: string, column: string, where: any, type: string = 'select', options: string = '', joinOption: JoinOption[] | null = null): Promise < any > {
    // SQL文成形
    const selectSql = Mysql.makeSelectSql(table, column, where, type, joinOption)
    // 昇順などの追加
    selectSql.sql = selectSql.sql + ' ' + options
    // SQL実行
    return Mysql.exeMysql(selectSql.sql, selectSql.params)
  }

  /**
   * SELECTONE処理
   * @static
   * @async
   * @param  {string} table テーブル名
   * @param  {string} column  カラム
   * @param  {any} where 検索条件
   * @param  {string} type クエリタイプ
   * @param  {any} options オプション
   * @param  {any} joinOption JOINオプション
   * @return {any[]} 結果
   */
  static async selectOne(table: string, column: string, where: any, type: string = 'select', options: string = '', joinOption: JoinOption[] | null = null): Promise < any > {
    // SQL文成形
    const selectSql = Mysql.makeSelectSql(table, column, where, type, joinOption)
    // 昇順などの追加
    selectSql.sql = selectSql.sql + ' ' + options
    // SQL実行
    try {
      const rows = await Mysql.exeMysql(selectSql.sql, selectSql.params)

      if (UtilCore.isExistArray(rows)) {
        return rows[0]
      }

      return null
    } catch (err) {
      throw err
    }
  }

  /**
   * Insert文成形
   * @static
   * @param  {string} table テーブル名
   * @param  {any} insertValue  追加情報
   * @param  {boolean} duplicateUpdate
   * @return {MakeSqlResult} Insert文成形
   */
  static _makeInsertSql(table: string, insertValue: any, duplicateUpdate: boolean): MakeSqlResult {
    // パラメータ格納用配列
    let params = []

    // function内変数
    let insertSql = 'INSERT INTO ' + table
    const insertValueCount = Object.keys(insertValue).length
    let insertColumn = ''
    let lastCountInsert = 0
    let insertColumnSql = conf.leftParenthesis
    let insertValuesSql = 'VALUES' + conf.leftParenthesis
    let updateSqlValue = ''

    // insertのカラムとvalue生成
    for (insertColumn in insertValue) {
      updateSqlValue += insertColumn + ' =' + dummyParam
      insertColumnSql += insertColumn
      insertValuesSql += dummyParam
      params.push(insertValue[insertColumn])

      if (lastCountInsert !== insertValueCount - 1) {
        insertColumnSql += conf.commma
        insertValuesSql += conf.commma
        updateSqlValue += conf.commma
      } else {
        insertValuesSql += conf.rightParenthesis
        insertColumnSql += conf.rightParenthesis
      }

      lastCountInsert = lastCountInsert + 1
    }

    // INSERT文成形
    insertSql += insertColumnSql + insertValuesSql

    if (duplicateUpdate === true) {
      insertSql += ' on duplicate key UPDATE ' + updateSqlValue + ';'
      params = params.concat(params)
    }

    return {
      sql: insertSql,
      params: params
    }
  }

  /**
   * INSERT処理
   * @static
   * @param  {string} table テーブル名
   * @param  {any} insertValue 追加情報
   * @param  {boolean} duplicateUpdate
   * @return {Promis<any>} 追加結果
   */
  static insert(table: string, insertValue: any, duplicateUpdate: boolean): Promise < any > {
    // SQL文成形
    const insertSql = Mysql._makeInsertSql(table, insertValue, duplicateUpdate)
    // SQL実行
    return Mysql.exeMysql(insertSql.sql, insertSql.params)
  }

  /**
   * 変更SQLの生成
   * @static
   * @param {string} table テーブル名
   * @param {*} where 条件
   * @param {*} updateData 変更データ
   * @returns {MakeSqlResult} Sql結果
   */
  static _makeUpdateSql(table: string, where: any, updateData: any): MakeSqlResult {
    // パラメータ
    let params = []
    let updateSql = `UPDATE ${table} SET `

    const updateArray = []
    // 変更データを格納
    for (const key in updateData) {
      updateArray.push(`${key} = ${dummyParam}`)
      params.push(updateData[key])
    }
    const updateValue = updateArray.join(conf.commma)
    updateSql = updateSql + updateValue

    // 条件をセット
    const whereSql = Mysql.makeWhereSql(where, false)
    if (whereSql.whereValue !== '') {
      updateSql = updateSql + ` WHERE ${whereSql.whereValue}`
      params = params.concat(whereSql.params)
    }

    return {
      sql: updateSql,
      params: params
    }
  }

  /**
   * UPDATE処理
   * @static
   * @param {string} table テーブル名
   * @param {*} where 条件
   * @param {*} updateData 変更データ
   * @returns {Promise < any >} 処理結果
   */
  static update(table: string, where: any, updateData: any): Promise < any > {
    const updateSql = Mysql._makeUpdateSql(table, where, updateData)
    // SQL実行
    return Mysql.exeMysql(updateSql.sql, updateSql.params)
  }

  /**
   * 削除SQLの生成
   * @static
   * @param {string} table テーブル名
   * @param {*} where 条件
   * @param {string} options オプション
   * @returns {MakeSqlResult} Sql結果
   */
  static _makeDeleteSql(table: string, where: any, options: string = ''): MakeSqlResult {
    // パラメータ
    let params = []
    let deleteSql = `DELETE FROM ${table} `

    // 条件をセット
    const whereSql = Mysql.makeWhereSql(where, false)
    // 条件がない場合は、空字を返す
    if (whereSql.whereValue === '') {
      return {
        sql: '',
        params: []
      }
    }
    deleteSql = deleteSql + ` WHERE ${whereSql.whereValue} ${options}`
    params = params.concat(whereSql.params)

    return {
      sql: deleteSql,
      params: params
    }
  }

  /**
   * DELETE処理
   * @static
   * @param {string} table テーブル名
   * @param {*} where 条件
   * @param {string} options オプション
   * @returns {Promise < any >} 処理結果
   */
  static delete(table: string, where: any, options: string = ''): Promise < any > {
    const deleteSql = Mysql._makeDeleteSql(table, where, options)
    // Sqlがない場合は、falseを返す
    if (deleteSql.sql === '') {
      return Promise.resolve(false)
    }
    // SQL実行
    return Mysql.exeMysql(deleteSql.sql, deleteSql.params)
  }
}

export default Mysql
