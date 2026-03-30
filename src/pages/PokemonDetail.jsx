import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTeamActions } from '../hooks/useTeamActions'
import { useLanguage } from '../context/LanguageContext'
import { getPokemonByName, getPokemonSpecies } from '../api/pokemon'
import { translateText } from '../api/translate'
import LoadingSpinner from '../components/LoadingSpinner'
import AddToTeamForm from '../components/AddToTeamForm'
import EvolutionChain from '../components/EvolutionChain'
import styles from './PokemonDetail.module.css'

const TYPE_COLORS = {
  grass: '#78c850', poison: '#a040a0', fire: '#f08030', water: '#6890f0',
  electric: '#f8d030', normal: '#a8a878', fairy: '#ee99ac', ghost: '#705898',
  psychic: '#f85888', ice: '#98d8d8', dragon: '#7038f8', dark: '#705848',
  steel: '#b8b8d0', fighting: '#c03028', flying: '#a890f0', bug: '#a8b820',
  rock: '#b8a038', ground: '#e0c068',
}

function getFlavorTextEn(species) {
  if (!species) return ''
  const entry = species.flavor_text_entries.find(
    (e) => e.language.name === 'en'
  )
  return entry ? entry.flavor_text.replace(/\f|\n/g, ' ') : ''
}

function PokemonDetail() {
  const { name } = useParams()
  const { lang, t } = useLanguage()
  const team = useSelector((state) => state.team.members)
  const { add: addToTeamAction } = useTeamActions()
  const [pokemon, setPokemon] = useState(null)
  const [species, setSpecies] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [flavorText, setFlavorText] = useState('')
  const [translatedAbilities, setTranslatedAbilities] = useState({})

  // Fetch pokemon + species data
  useEffect(() => {
    let cancelled = false

    async function fetchDetail() {
      try {
        setLoading(true)
        setError(null)

        const pokemonData = await getPokemonByName(name)
        const speciesData = await getPokemonSpecies(pokemonData.id)

        if (cancelled) return

        setPokemon(pokemonData)
        setSpecies(speciesData)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchDetail()

    return () => {
      cancelled = true
    }
  }, [name])

  // Translate flavor text when species or language changes
  useEffect(() => {
    const textEn = getFlavorTextEn(species)
    if (!textEn) {
      setFlavorText('')
      return
    }

    if (lang !== 'vi') {
      setFlavorText(textEn)
      return
    }

    let cancelled = false
    setFlavorText(textEn) // show English while translating

    translateText(textEn).then((result) => {
      if (!cancelled) setFlavorText(result)
    })

    return () => {
      cancelled = true
    }
  }, [species, lang])

  // Translate ability names when pokemon or language changes
  useEffect(() => {
    if (!pokemon) {
      setTranslatedAbilities({})
      return
    }

    const abilityNames = pokemon.abilities.map((a) =>
      a.ability.name.replace(/-/g, ' ')
    )

    if (lang !== 'vi') {
      const map = {}
      abilityNames.forEach((n) => { map[n] = n })
      setTranslatedAbilities(map)
      return
    }

    let cancelled = false

    async function translateAbilities() {
      const map = {}
      for (const abilityName of abilityNames) {
        if (cancelled) return
        map[abilityName] = await translateText(abilityName)
      }
      if (!cancelled) setTranslatedAbilities(map)
    }

    translateAbilities()

    return () => {
      cancelled = true
    }
  }, [pokemon, lang])

  // All hooks are above — safe to early return now
  if (loading) return <LoadingSpinner />
  if (error) return <p className={styles.error}>{error}</p>
  if (!pokemon || !species) return null

  const types = pokemon.types.map((tp) => tp.type.name)
  const primaryColor = TYPE_COLORS[types[0]] || '#a8a878'
  const isTeamFull = team.length >= 6

  function handleAdd(nickname) {
    addToTeamAction({
      pokemonId: pokemon.id,
      name: pokemon.name,
      nickname,
      image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
      types,
    })
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        &larr; {t('backToList')}
      </Link>

      <div className={styles.card}>
        <div className={styles.top} style={{ backgroundColor: primaryColor }}>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <p className={styles.id}>#{String(pokemon.id).padStart(3, '0')}</p>
          <h1 className={styles.name}>{pokemon.name}</h1>

          <div className={styles.types}>
            {types.map((type) => (
              <span
                key={type}
                className={styles.typeBadge}
                style={{ backgroundColor: TYPE_COLORS[type] }}
              >
                {t(`type.${type}`)}
              </span>
            ))}
          </div>

          <p className={styles.flavor}>{flavorText}</p>

          <AddToTeamForm
            pokemonName={pokemon.name}
            isTeamFull={isTeamFull}
            onAdd={handleAdd}
          />

          <div className={styles.stats}>
            <h2>{t('baseStats')}</h2>
            {pokemon.stats.map((s) => (
              <div key={s.stat.name} className={styles.statRow}>
                <span className={styles.statName}>{t(`stat.${s.stat.name}`)}</span>
                <span className={styles.statValue}>{s.base_stat}</span>
                <div className={styles.statBar}>
                  <div
                    className={styles.statFill}
                    style={{
                      width: `${Math.min(100, (s.base_stat / 255) * 100)}%`,
                      backgroundColor: primaryColor,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.abilities}>
            <h2>{t('abilities')}</h2>
            <div className={styles.abilityList}>
              {pokemon.abilities.map((a) => {
                const key = a.ability.name.replace(/-/g, ' ')
                return (
                  <span key={a.ability.name} className={styles.ability}>
                    {translatedAbilities[key] || key}
                    {a.is_hidden && <small> ({t('hidden')})</small>}
                  </span>
                )
              })}
            </div>
          </div>

          <EvolutionChain evolutionUrl={species.evolution_chain?.url} />

          <div className={styles.physical}>
            <div>
              <strong>{t('height')}</strong>
              <p>{(pokemon.height / 10).toFixed(1)} m</p>
            </div>
            <div>
              <strong>{t('weight')}</strong>
              <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
            </div>
            <div>
              <strong>{t('baseExp')}</strong>
              <p>{pokemon.base_experience}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
