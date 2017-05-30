/* @flow */
import Vue from 'vue'
import store from '../store'

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
    sendAPIErrorToSlack(endpoint, options, err)
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
    sendAPIErrorToSlack(endpoint, options, err)
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
    sendAPIErrorToSlack(endpoint, options, err)
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
    sendAPIErrorToSlack(endpoint, options, err)
    return null
  }
}

/**
 * SlackにAPIエラーを通知する
 * @param {*} message メッセージ
 */
async function sendAPIErrorToSlack(endpoint: string, options: any, error: any) {
  if (typeof error === Error) {
    error = error.stack
  }
  const user = store.modules.user.state.user
  const group = store.modules.user.state.selectedGroup
  const message = `
クライアント側でAPIエラーが発生しました。
グループ: ${group.groupName}(${String(group.groupId)})
ユーザー名: ${user.name}(${user.email})
Endpoint: ${endpoint}
Options: ${JSON.stringify(options)}
Error: ${JSON.stringify(error)}`

  const slackEndpoint = '/common/sendSlack'
  await Vue.axios.post(API_PREFIX + slackEndpoint, {
    message: message
  })
}

export default {
  get,
  post,
  put,
  delete: sendDelete
}
