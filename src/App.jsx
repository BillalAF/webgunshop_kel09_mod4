import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import INITIAL_GUNS from './data/guns.js'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [guns, setGuns] = useState(INITIAL_GUNS)
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState(null)

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => {
      setToast((curr) => (curr === message ? null : curr))
    }, 2500)
  }

  const handleAddToCart = (gun) => {
    if (cart.some((item) => item.name === gun.name)) {
      showToast(`${gun.name} sudah ada di keranjang!`)
      return
    }
    setCart((prev) => [...prev, gun])
    showToast(`✓ ${gun.name} dimasukkan ke keranjang`)
  }

  const handleRemoveFromCart = (gunName) => {
    setCart((prev) => prev.filter((item) => item.name !== gunName))
  }

  const handleCheckout = () => {
    if (cart.length === 0) return
    const purchasedNames = cart.map((item) => item.name)
    // Hapus senjata yang dibeli dari stok halaman utama
    setGuns((prevGuns) => prevGuns.filter((gun) => !purchasedNames.includes(gun.name)))
    // Kosongkan isi keranjang
    setCart([])
  }

  return (
    <div className="shell">
      <Header tab={tab} onTab={setTab} cartCount={cart.length} />

      {toast && (
        <div className="toast">
          <span>{toast}</span>
        </div>
      )}

      <main className="main">
        {tab === 'Catalog' && (
          <Catalog
            guns={guns}
            cart={cart}
            onAddToCart={handleAddToCart}
          />
        )}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
        {tab === 'Cart' && (
          <Cart
            cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={handleCheckout}
            onBackToCatalog={() => setTab('Catalog')}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
