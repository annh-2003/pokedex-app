import { useLanguage } from '../context/LanguageContext'
import styles from './AboutPage.module.css'

function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className={styles.page}>
      <h1>{t('aboutTitle')}</h1>
      <p>{t('aboutDescription')}</p>

      <h2>{t('modulesCovered')}</h2>
      <ul>
        <li><strong>Module 1</strong> — Introduction to React & JSX</li>
        <li><strong>Module 2</strong> — Components & Props</li>
        <li><strong>Module 3</strong> — Styling (CSS Modules)</li>
        <li><strong>Module 4</strong> — State & useState</li>
        <li><strong>Module 5</strong> — useEffect & Side Effects</li>
        <li><strong>Module 6</strong> — React Router DOM</li>
        <li><strong>Module 7</strong> — React Form & List and Key</li>
        <li><strong>Module 8</strong> — Complex Components (Edit/Delete)</li>
        <li><strong>Module 9</strong> — Context API (Theme & Team)</li>
        <li><strong>Module 10</strong> — RESTful APIs (Filter, Evolution, Toast)</li>
        <li><strong>Module 11</strong> — Redux & Redux-thunk</li>
      </ul>

      <h2>{t('dataSource')}</h2>
      <p>
        {t('dataSourceDescription')}{' '}
        <a href="https://pokeapi.co" target="_blank" rel="noreferrer">
          PokéAPI
        </a>
        {t('dataSourceSuffix')}
      </p>
    </div>
  )
}

export default AboutPage
