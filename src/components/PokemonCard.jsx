import { useLanguage } from '../context/LanguageContext'
import styles from './PokemonCard.module.css'

// Map type name to background class name
const typeBgMap = {
  grass: 'bgGrass',
  poison: 'bgPoison',
  fire: 'bgFire',
  water: 'bgWater',
  electric: 'bgElectric',
  normal: 'bgNormal',
  fairy: 'bgFairy',
  ghost: 'bgGhost',
  psychic: 'bgPsychic',
  ice: 'bgIce',
  dragon: 'bgDragon',
  dark: 'bgDark',
  steel: 'bgSteel',
  fighting: 'bgFighting',
  flying: 'bgFlying',
  bug: 'bgBug',
  rock: 'bgRock',
  ground: 'bgGround',
}

function PokemonCard({ id, name, image, types }) {
  const { t } = useLanguage()
  const primaryType = types[0]
  const bgClass = styles[typeBgMap[primaryType]] || ''

  return (
    <div className={styles.card}>
      <div className={`${styles.imageContainer} ${bgClass}`}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.info}>
        <p className={styles.id}>#{String(id).padStart(3, '0')}</p>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.types}>
          {types.map((type) => (
            <span
              key={type}
              className={`${styles.typeBadge} ${styles[type] || ''}`}
            >
              {t(`type.${type}`)}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonCard
