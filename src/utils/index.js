import crypto from 'crypto'

export function rsaEncryptStr (publicKey, text) {
  let pubKey = '-----BEGIN PUBLIC KEY-----' + publicKey + '-----END PUBLIC KEY-----'
  let bufferText = Buffer.from(text, 'utf8')
  return crypto.publicEncrypt({ key: pubKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufferText).toString('base64')
}

export function rsaDecryptStr (privateKey, text) {
  let priKey = '-----BEGIN RSA PRIVATE KEY-----' + privateKey + '-----END RSA PRIVATE KEY-----'
  let bufferText = Buffer.from(text, 'base64')
  return crypto.privateDecrypt({ key: priKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufferText).toString('utf8')
}

export function aesEncryptStr (key, text) {
  let cipher = crypto.createCipheriv('aes-128-ecb', key, '')
  return cipher.update(text, 'utf8', 'base64') + cipher.final('base64')
}

export function aesDecryptStr (key, text) {
  let cipher = crypto.createDecipheriv('aes-128-ecb', key, '')
  return cipher.update(text, 'base64', 'utf8') + cipher.final('utf8')
}

export function formatSeconds (theTime) {
  let theTime1 = 0
  let theTime2 = 0
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60)
      theTime1 = parseInt(theTime1 % 60)
    }
  }
  let result = '' + parseInt(theTime) + '秒'
  if (theTime1 > 0) {
    result = '' + parseInt(theTime1) + '分' + result
  }
  if (theTime2 > 0) {
    result = '' + parseInt(theTime2) + '小时' + result
  }
  return result
}

export function disableEvent () {
  document.oncontextmenu = function () {
    return false
  }
  document.oncopy = function () {
    return false
  }
  document.onselectstart = function () {
    return false
  }
  document.onpaste = function () {
    return false
  }
  document.oncut = function () {
    return false
  }
}
