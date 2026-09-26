import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog() {
  return (
    <>
      <section className="masthead">
        <h1 className="display">Gunshop 09</h1>
        <p className="lede">
        Tempat penjualan senjata pasukan Rongawi
        </p>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{GUNS.length} pieces</span>
        </div>
        <ul className="stock">
          {GUNS.map((gun) => <GunCard key={gun.name} gun={gun} />)}
        </ul>
      </section>
    </>
  )
}

export default Catalog
