import { cryptoData, cryptoAssets } from './data'

export function fetchCrypto() {
  return new Promise((res) => {
    setTimeout(() => res(cryptoData), 150)
  })
}

export function fetchAssets() {
  return new Promise((res) => {
    setTimeout(() => res(cryptoAssets), 200)
  })
}
