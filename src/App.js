import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ConnectWallet from './components/ConnectWallet'
import Detalle from './pages/Detalle'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ConnectWallet/>} />
        <Route path='/detailNft/:add/:id' element={<Detalle/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App