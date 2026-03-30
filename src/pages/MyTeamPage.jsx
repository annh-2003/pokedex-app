import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLanguage } from '../context/LanguageContext'
import TeamMemberCard from '../components/TeamMemberCard'
import styles from './MyTeamPage.module.css'

function MyTeamPage() {
  const { t } = useLanguage()
  const team = useSelector((state) => state.team.members)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>{t('myTeam')}</h1>
        <span className={styles.count}>{team.length}/6</span>
      </div>

      {team.length === 0 ? (
        <div className={styles.empty}>
          <p>{t('teamEmpty')}</p>
          <Link to="/" className={styles.browseLink}>
            {t('browsePokedex')}
          </Link>
        </div>
      ) : (
        <ul className={styles.list}>
          {team.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyTeamPage
