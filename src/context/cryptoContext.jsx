import { useContext } from 'react'
import { createContext, useState, useEffect } from 'react'
import { fetchAssets, fetchCrypto } from '../api'
import { percentDifference } from '../utils'

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
})

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState([])
  const [assets, setAssets] = useState([])

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id)
      return {
        name: coin.name,
        grow: coin.price > asset.price,
        growPercent: percentDifference(coin.price, asset.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        ...asset,
      }
    })
  }

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const { result } = await fetchCrypto()
      const assets = await fetchAssets()
      setCrypto(result)
      setAssets(mapAssets(assets, result))
      setLoading(false)
    }
    preload()
  }, [])

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto))
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  )
}

export default CryptoContext

export function useCrypto() {
  return useContext(CryptoContext)
}
