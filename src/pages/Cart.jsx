import { useState } from 'react'

function Cart({ cart, onRemoveFromCart, onCheckout, onBackToCatalog }) {
  const [checkoutComplete, setCheckoutComplete] = useState(false)
  const [checkedOutItems, setCheckedOutItems] = useState([])

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  const handleCheckoutClick = () => {
    setCheckedOutItems([...cart])
    onCheckout()
    setCheckoutComplete(true)
  }
  if (checkoutComplete) {
    return (
      <div className="page cart-page">
        <div className="checkout-success">
          <div className="success-icon">✓</div>
          <h1 className="display">Checkout Berhasil!</h1>
          <p className="lede">
            Pesanan Anda telah diproses. Senjata berikut telah dibeli dan otomatis dikeluarkan dari stok katalog utama:
          </p>
          <ul className="checkout-items-list">
            {checkedOutItems.map((item) => (
              <li key={item.name} className="checkout-item">
                <span>{item.name} ({item.type} · {item.caliber})</span>
                <span className="price">${item.price.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-success-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setCheckoutComplete(false)
                onBackToCatalog()
              }}
            >
              Kembali ke Katalog
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page cart-page">
      <div className="cart-header">
        <h1 className="display">Keranjang Belanja</h1>
        <p className="lede">Daftar senjata siap beli.</p>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Keranjang Anda saat ini kosong.</p>
          <button type="button" className="btn-secondary" onClick={onBackToCatalog}>
            Lihat Katalog Senjata
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.name} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" width="70" height="50" />
                <div className="cart-item-info">
                  <h3 className="name display">{item.name}</h3>
                  <span className="type">{item.type} · {item.caliber}</span>
                </div>
                <div className="cart-item-price price">
                  ${item.price.toLocaleString()}
                </div>
                <button
                  type="button"
                  className="cart-item-remove"
                  onClick={() => onRemoveFromCart(item.name)}
                  title="Hapus dari keranjang"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>Total Senjata:</span>
              <span>{cart.length} item</span>
            </div>
            <div className="cart-summary-row total-row">
              <span>Total Harga:</span>
              <span className="price">${totalPrice.toLocaleString()}</span>
            </div>
            <div className="cart-summary-actions">
              <button
                type="button"
                className="btn-checkout"
                onClick={handleCheckoutClick}
              >
                Checkout Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
