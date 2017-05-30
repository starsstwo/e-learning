/* @flow */
import config from '../config'
import crypto from 'crypto'

class Crypto {

  /**
   * 暗号化処理
   * @static
   * @param {string} planeText 暗号化するバリュー
   * @return {string} 暗号化したバリュー
   */
  static cipherText(planeText: string): string {
    // 暗号化キー
    const key = config.crypto.key
    const cipher = crypto.createCipher('aes192', key)

    cipher.update(planeText, 'utf8', 'hex')
    const cipheredText = cipher.final('hex')

    return cipheredText
  }

  /**
   * 復号化処理
   * @static
   * @param {string} cipheredText 復号化する文字列
   * @returns {string} 復号化する文字列
   */
  static decipherText(cipheredText: string): string {
    // 復号化キー
    const key = config.crypto.key
    const decipher = crypto.createDecipher('aes192', key)
    // 復号化が成功する場合、復号化した文字列をリターン
    try {
      decipher.update(cipheredText, 'hex', 'utf8')
      const decipheredText = decipher.final('utf8')

      return decipheredText
    } catch (ex) {
      return ''
    }
  }
}

export default Crypto
