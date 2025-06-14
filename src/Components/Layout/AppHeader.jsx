import { Layout, Select, Space, Button, Modal, Drawer } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCrypto } from '../../context/cryptoContext'
import AddAssetForm from '../AddAssetForm'
import CoinInfoModal from '../CoinInfoModal'

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
}

export default function AppHeader() {
  const { crypto } = useCrypto()
  const [drawer, setDrawer] = useState(false)
  const [coin, setCoin] = useState(null)
  const [select, setSelect] = useState(false)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    function keypress(e) {
      if (e.key === '/') setSelect((prev) => !prev)
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  function handleSelect(value) {
    setModal(true)
    setCoin(crypto.find((c) => c.id === value))
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        onSelect={handleSelect}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        value='Press / to open'
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{' '}
            {option.data.label}
          </Space>
        )}
      />
      <Button type='primary' onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        title='Add Asset'
        closable={{ 'aria-label': 'Close Button' }}
        onClose={() => setDrawer(false)}
        open={drawer}
        width={600}
        destroyOnHidden
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  )
}
