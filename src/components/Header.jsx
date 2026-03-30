import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import styles from './Header.module.css'

function Header({ title }) {
  const { theme, toggleTheme } = useTheme()
  const { lang, t, toggleLanguage } = useLanguage()
  const team = useSelector((state) => state.team.members)

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="PokéAPI Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>{title}</h1>
      </div>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          {t('home')}
        </NavLink>
        <NavLink
          to="/my-team"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          {t('myTeam')}
          {team.length > 0 && (
            <span className={styles.badge}>{team.length}</span>
          )}
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          {t('about')}
        </NavLink>
        <button className={styles.langBtn} onClick={toggleLanguage}>
          {lang === 'en' ? 'VI' : 'EN'}
        </button>
        <button className={styles.themeBtn} onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  )
}

export default Header
