import { useLanguage } from '../context/LanguageContext'
import styles from './LoadingSpinner.module.css'

function LoadingSpinner() {
  const { t } = useLanguage()

  return (
    <div className={styles.container}>
      <div className={styles.pokeball}></div>
      <p className={styles.text}>{t('loading')}</p>
    </div>
  )
}

export default LoadingSpinner
