/* @flow */
import Vue from 'vue'

const API_PREFIX = '/api'

/**
 * SEND GET API
 * @param {string} endpoint エンドポイント
 * @param {*} options オプション
 * @returns
 */
async function get(endpoint: string, options: any) {
  try {
    const response = await Vue.axios.get(API_PREFIX + endpoint, options)
    if (response && response.data) {
      return response.data
    }
    return null
  } catch (err) {
    return null
  }
}

/**
 * Send POST API
 * @param {string} endpoint エンドポイント
 * @param {*} options オプション
 * @returns
 */
async function post(endpoint: string, options: any) {
  try {
    const response = await Vue.axios.post(API_PREFIX + endpoint, options)

    const data = response.data || null
    return data
  } catch (err) {
    return null
  }
}

/**
 * Send PUT API
 * @param {string} endpoint エンドポイント
 * @param {*} options オプション
 * @returns
 */
async function put(endpoint: string, options: any) {
  try {
    const response = await Vue.axios.put(API_PREFIX + endpoint, options)

    const data = response.data || null
    return data
  } catch (err) {
    return null
  }
}

/**
 * Send DELETE API
 * @param {string} endpoint エンドポイント
 * @param {*} options オプション
 * @returns
 */
async function sendDelete(endpoint: string, options: any) {
  try {
    const response = await Vue.axios.delete(API_PREFIX + endpoint, options)

    const data = response.data || null
    return data
  } catch (err) {
    return null
  }
}

export default {
  get,
  post,
  put,
  delete: sendDelete
}
