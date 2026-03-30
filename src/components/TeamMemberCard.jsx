import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTeamActions } from '../hooks/useTeamActions'
import { useLanguage } from '../context/LanguageContext'
import styles from './TeamMemberCard.module.css'

const TYPE_COLORS = {
  grass: '#78c850', poison: '#a040a0', fire: '#f08030', water: '#6890f0',
  electric: '#f8d030', normal: '#a8a878', fairy: '#ee99ac', ghost: '#705898',
  psychic: '#f85888', ice: '#98d8d8', dragon: '#7038f8', dark: '#705848',
  steel: '#b8b8d0', fighting: '#c03028', flying: '#a890f0', bug: '#a8b820',
  rock: '#b8a038', ground: '#e0c068',
}

function TeamMemberCard({ member }) {
  const { t } = useLanguage()
  const { update, remove } = useTeamActions()
  const [editing, setEditing] = useState(false)
  const [nickname, setNickname] = useState(member.nickname)

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = nickname.trim()
    if (!trimmed) return
    update(member.id, member, trimmed)
    setEditing(false)
  }

  function handleCancel() {
    setNickname(member.nickname)
    setEditing(false)
  }

  const Wrapper = editing ? 'div' : Link
  const wrapperProps = editing
    ? { className: styles.info }
    : { to: `/pokemon/${member.name}`, className: styles.info }

  return (
    <li className={styles.card}>
      <Wrapper {...wrapperProps}>
        <img
          src={member.image}
          alt={member.name}
          className={styles.image}
        />
        <div className={styles.details}>
          {editing ? (
            <form onSubmit={handleSubmit} className={styles.editForm}>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className={styles.editInput}
                maxLength={20}
                autoFocus
              />
              <div className={styles.editActions}>
                <button type="submit" className={styles.saveBtn}>{t('save')}</button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={handleCancel}
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          ) : (
            <>
              <h3 className={styles.nickname}>{member.nickname}</h3>
              <p className={styles.species}>{member.name}</p>
            </>
          )}
          <div className={styles.types}>
            {member.types.map((type) => (
              <span
                key={type}
                className={styles.typeBadge}
                style={{ backgroundColor: TYPE_COLORS[type] }}
              >
                {t(`type.${type}`)}
              </span>
            ))}
          </div>
        </div>
      </Wrapper>

      <div className={styles.actions}>
        {!editing && (
          <button
            className={styles.editBtn}
            onClick={() => setEditing(true)}
          >
            {t('edit')}
          </button>
        )}
        <button
          className={styles.removeBtn}
          onClick={() => remove(member.id, member.nickname)}
        >
          {t('remove')}
        </button>
      </div>
    </li>
  )
}

export default TeamMemberCard
