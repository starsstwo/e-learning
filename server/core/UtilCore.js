/* @flow */
import randomstring from 'randomstring'
/**
 * ユーティリティ処理用クラス
 * 型判定等、汎用的な処理をStaticメソッドで定義
 */
class UtilCore {

  /**
   * 型が配列でデータが存在する場合
   * @static
   * @param {any} data チェックするデータ
   * @returns {boolean} 判定フラグ
   */
  static isExistArray(data: any): boolean {
    // 配列の場合
    if (Array.isArray(data) === true) {
      // データが0件の場合、false
      if (data.length === 0) {
        return false
      } else {
        // 1件以上の場合、true
        return true
      }
    } else {
      // 配列以外の場合(null,undefined,文字列,オブジェクト)
      return false
    }
  }

  /**
   * ランダム文字を生成
   * @static
   * @param {number} length 文字カウント
   * @returns {string} ランダム文字
   */
  static randomString(length: number): string {
    return randomstring.generate(length)
  }
}

export default UtilCore
