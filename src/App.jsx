import AppLayout from './Components/Layout/AppLayout'
import { CryptoContextProvider } from './context/cryptoContext'

export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  )
}
