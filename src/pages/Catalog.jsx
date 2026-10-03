import { useState, useMemo } from 'react'
import GunCard from '../components/GunCard.jsx'

function Catalog({ guns = [], cart = [], onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')

  // Filter berdasarkan pencarian dan urutkan berdasarkan harga atau nama
  const displayedGuns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    let result = guns.filter((gun) => {
      if (!query) return true
      return (
        gun.name.toLowerCase().includes(query) ||
        gun.type.toLowerCase().includes(query) ||
        gun.caliber.toLowerCase().includes(query)
      )
    })

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'name-desc') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name))
    }

    return result
  }, [guns, searchQuery, sortBy])

  return (
    <>
      <section className="masthead">
        <h1 className="display">Gunshop 09</h1>
        <p className="lede">
          Tempat penjualan senjata pasukan Rongawi
        </p>
      </section>

      <section>
        {/* Fitur Search & Sort */}
        <div className="catalog-controls">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Cari Senjata (nama/tipe/kaliber)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearchQuery('')}
                title="Hapus pencarian"
              >
                ✕
              </button>
            )}
          </div>

          <div className="sort-wrapper">
            <span className="sort-label">Sort:</span>
            <div className="sort-buttons">
              <button
                type="button"
                className={`sort-btn ${sortBy === 'default' ? 'active' : ''}`}
                onClick={() => setSortBy('default')}
              >
                Default
              </button>
              <button
                type="button"
                className={`sort-btn ${sortBy === 'price-asc' ? 'active' : ''}`}
                onClick={() => setSortBy('price-asc')}
              >
                Harga: Rendah
              </button>
              <button
                type="button"
                className={`sort-btn ${sortBy === 'price-desc' ? 'active' : ''}`}
                onClick={() => setSortBy('price-desc')}
              >
                Harga: Tinggi
              </button>
              <button
                type="button"
                className={`sort-btn ${sortBy === 'name-asc' ? 'active' : ''}`}
                onClick={() => setSortBy('name-asc')}
              >
                Nama: A-Z
              </button>
              <button
                type="button"
                className={`sort-btn ${sortBy === 'name-desc' ? 'active' : ''}`}
                onClick={() => setSortBy('name-desc')}
              >
                Nama: Z-A
              </button>
            </div>
          </div>
        </div>

        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{displayedGuns.length} pieces</span>
        </div>

        {displayedGuns.length > 0 ? (
          <ul className="stock">
            {displayedGuns.map((gun) => (
              <GunCard
                key={gun.name}
                gun={gun}
                isInCart={cart.some((item) => item.name === gun.name)}
                onAddToCart={onAddToCart}
              />
            ))}
          </ul>
        ) : (
          <p className="empty-state">no guns found</p>
        )}
      </section>
    </>
  )
}

export default Catalog
