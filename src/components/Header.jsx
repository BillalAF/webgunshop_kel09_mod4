const NAV = ['Catalog', 'About', 'Contact']

function Header({ tab, onTab, cartCount = 0 }) {
  return (
    <header className="header">
      <span className="brand display">Gunshop Kelompok 09</span>
      <nav className="nav">
        {NAV.map((item) => (
          <button
            key={item}
            type="button"
            className={tab === item ? 'nav-link active' : 'nav-link'}
            onClick={() => onTab(item)}
          >
            {item}
          </button>
        ))}
        <button
          type="button"
          className={tab === 'Cart' ? 'nav-link cart-nav-btn active' : 'nav-link cart-nav-btn'}
          onClick={() => onTab('Cart')}
        >
          Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </nav>
    </header>
  )
}

export default Header
