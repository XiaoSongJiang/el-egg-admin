import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKFFoYGJ3GnXl/hDiQAsD7o2ezWVOjpF
2vtKfED5OQucyLkUou523JwPsZwyOKoSJiK8ZAzv7vsbrw0YTRVyt6ECAwEAAQ==`

const privateKey = `MIIBOwIBAAJBAKFFoYGJ3GnXl/hDiQAsD7o2ezWVOjpF2vtKfED5OQucyLkUou52
3JwPsZwyOKoSJiK8ZAzv7vsbrw0YTRVyt6ECAwEAAQJAJ8I/3+y570ociDM2Klmy
guj9lSc2FLm2E++4FFic7LSVDkm0C3iD02BafcTkA4IJoYYfC8j2SrzuW+StqOV2
9QIhANjB8+S6pbDFwc1w3eRAjLJZnW8fD7aUG0Ka4seRSuE3AiEAvngXHr2HYOsC
nbTqzwLEy+dradTjj/K3E+jiTB5F+ecCIQDGhh1TSH+ov/cYql8QRu6WCu3ecJx7
pHqzLhi2n6PtUQIhAI50UxZyumYKXxKE1XmuoHHAy92DlA99gOArNdWobr3RAiB8
Hn5snlqcoarn8vgVyY0QiijgBs2YX2+RNyQYWYIwEw==`
// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}

