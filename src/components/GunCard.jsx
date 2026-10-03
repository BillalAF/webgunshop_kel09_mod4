import { useRef } from 'react'

function GunCard({ gun, isInCart, onAddToCart }) {
  const popup = useRef(null)

  return (
    <li className="card">
      <div className="card-box">
        <div
          className="card-clickable"
          onClick={() => popup.current.showModal()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && popup.current.showModal()}
        >
          <img className="card-img" src={gun.image} alt={gun.name} width="120" height="90" />
          <span className="name display">{gun.name}</span>
          <span className="type">
            {gun.type} · {gun.caliber}
          </span>
          <span className="price">${gun.price.toLocaleString()}</span>
        </div>
        <div className="card-actions">
          <button
            type="button"
            className={`btn-cart ${isInCart ? 'in-cart' : ''}`}
            disabled={isInCart}
            onClick={() => onAddToCart(gun)}
          >
            {isInCart ? '✓ Di Keranjang' : '+ Keranjang'}
          </button>
        </div>
      </div>

      <dialog
        className="popup"
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <img className="popup-img" src={gun.image} alt={gun.name} width="240" height="180" />
        <h3 className="display">{gun.name}</h3>
        <p className="type">
          {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
        </p>
        <p>{gun.description}</p>
        <div className="popup-actions">
          <button
            type="button"
            className={`btn-cart ${isInCart ? 'in-cart' : ''}`}
            disabled={isInCart}
            onClick={() => {
              onAddToCart(gun)
              popup.current.close()
            }}
          >
            {isInCart ? '✓ Sudah di Keranjang' : '+ Tambah ke Keranjang'}
          </button>
          <form method="dialog">
            <button className="popup-close">Tutup</button>
          </form>
        </div>
      </dialog>
    </li>
  )
}

export default GunCard
