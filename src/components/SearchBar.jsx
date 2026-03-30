import { useLanguage } from '../context/LanguageContext'
import styles from './SearchBar.module.css'

function SearchBar({ value, onChange }) {
  const { t } = useLanguage()

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder={t('searchPlaceholder')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className={styles.clearBtn} onClick={() => onChange('')}>
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
