import { useLanguage } from '../context/LanguageContext'
import styles from './TypeFilter.module.css'

const TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
]

const TYPE_COLORS = {
  normal: '#a8a878', fire: '#f08030', water: '#6890f0', electric: '#f8d030',
  grass: '#78c850', ice: '#98d8d8', fighting: '#c03028', poison: '#a040a0',
  ground: '#e0c068', flying: '#a890f0', psychic: '#f85888', bug: '#a8b820',
  rock: '#b8a038', ghost: '#705898', dragon: '#7038f8', dark: '#705848',
  steel: '#b8b8d0', fairy: '#ee99ac',
}

function TypeFilter({ selected, onChange }) {
  const { t } = useLanguage()

  return (
    <div className={styles.container}>
      <button
        className={`${styles.chip} ${!selected ? styles.active : ''}`}
        onClick={() => onChange(null)}
      >
        {t('allTypes')}
      </button>
      {TYPES.map((type) => (
        <button
          key={type}
          className={`${styles.chip} ${selected === type ? styles.active : ''}`}
          style={
            selected === type
              ? { backgroundColor: TYPE_COLORS[type], color: 'white', borderColor: TYPE_COLORS[type] }
              : {}
          }
          onClick={() => onChange(type)}
        >
          {t(`type.${type}`)}
        </button>
      ))}
    </div>
  )
}

export default TypeFilter
