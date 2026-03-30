import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import SearchBar from '../components/SearchBar'
import TypeFilter from '../components/TypeFilter'
import PokemonCard from '../components/PokemonCard'
import LoadingSpinner from '../components/LoadingSpinner'
import styles from './HomePage.module.css'

function HomePage({
  pokemon,
  loading,
  error,
  hasMore,
  selectedType,
  onSelectType,
  onLoadMore,
  onRetry,
}) {
  const { t } = useLanguage()
  const [search, setSearch] = useState('')

  const filtered = pokemon.filter((p) =>
    p.name.includes(search.toLowerCase())
  )

  return (
    <>
      <SearchBar value={search} onChange={setSearch} />
      <TypeFilter selected={selectedType} onChange={onSelectType} />

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={onRetry}>{t('retry')}</button>
        </div>
      )}

      <main className={styles.grid}>
        {filtered.map((p) => (
          <Link key={p.id} to={`/pokemon/${p.name}`} className={styles.link}>
            <PokemonCard
              id={p.id}
              name={p.name}
              image={p.image}
              types={p.types}
            />
          </Link>
        ))}
      </main>

      {loading && <LoadingSpinner />}

      {!loading && filtered.length === 0 && (
        <p className={styles.noResults}>
          {t('noPokemonFound')}
          {search && ` ${t('forSearch')} "${search}"`}
          {selectedType && ` ${t('withType')} "${selectedType}"`}
        </p>
      )}

      {!loading && hasMore && !search && !selectedType && (
        <div className={styles.loadMore}>
          <button className={styles.loadMoreBtn} onClick={onLoadMore}>
            {t('loadMore')}
          </button>
        </div>
      )}
    </>
  )
}

export default HomePage
