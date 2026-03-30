import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import styles from './AddToTeamForm.module.css'

function AddToTeamForm({ pokemonName, isTeamFull, onAdd }) {
  const { t } = useLanguage()
  const [nickname, setNickname] = useState('')
  const [added, setAdded] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (isTeamFull) return

    onAdd(nickname.trim() || pokemonName)
    setNickname('')
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className={styles.container}>
      <h2>{t('addToMyTeam')}</h2>
      {isTeamFull ? (
        <p className={styles.full}>{t('teamFull')}</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder={t('nicknamePlaceholder').replace('{name}', pokemonName)}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className={styles.input}
            maxLength={20}
          />
          <button type="submit" className={styles.btn}>
            {t('addToTeam')}
          </button>
        </form>
      )}
      {added && <p className={styles.success}>{t('addedToTeam')}</p>}
    </div>
  )
}

export default AddToTeamForm
