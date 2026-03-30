import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getEvolutionChain } from '../api/pokemon'
import { useLanguage } from '../context/LanguageContext'
import styles from './EvolutionChain.module.css'

function extractChain(chain) {
  const result = []
  let current = chain

  while (current) {
    const name = current.species.name
    const id = current.species.url.match(/\/(\d+)\//)?.[1]
    result.push({ name, id })
    current = current.evolves_to?.[0] || null
  }

  return result
}

function EvolutionChain({ evolutionUrl }) {
  const { t } = useLanguage()
  const [chain, setChain] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!evolutionUrl) return

    let cancelled = false

    async function fetchEvolution() {
      try {
        const data = await getEvolutionChain(evolutionUrl)

        if (!cancelled) {
          setChain(extractChain(data.chain))
        }
      } catch {
        // silently fail — evolution is optional
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchEvolution()

    return () => {
      cancelled = true
    }
  }, [evolutionUrl])

  if (loading || chain.length <= 1) return null

  return (
    <div className={styles.container}>
      <h2>{t('evolutionChain')}</h2>
      <div className={styles.chain}>
        {chain.map((evo, index) => (
          <div key={evo.name} className={styles.stage}>
            {index > 0 && <span className={styles.arrow}>&rarr;</span>}
            <Link to={`/pokemon/${evo.name}`} className={styles.evoLink}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.id}.png`}
                alt={evo.name}
                className={styles.evoImage}
              />
              <span className={styles.evoName}>{evo.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EvolutionChain
