import axios from 'axios'

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})

// Transform raw pokemon data to our app format
function formatPokemon(data) {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
    types: data.types.map((t) => t.type.name),
  }
}

// GET /pokemon?limit=20&offset=0 — paginated list
export async function getPokemonList(limit = 20, offset = 0) {
  const { data: listData } = await pokeApi.get('/pokemon', {
    params: { limit, offset },
  })

  const details = []
  for (const p of listData.results) {
    const { data } = await axios.get(p.url)
    details.push(formatPokemon(data))
  }

  return {
    pokemon: details,
    hasMore: listData.next !== null,
  }
}

// GET /pokemon/{name} — single pokemon details
export async function getPokemonByName(name) {
  const { data } = await pokeApi.get(`/pokemon/${name}`)
  return data
}

// GET /pokemon-species/{id} — species data (flavor text, evolution chain url)
export async function getPokemonSpecies(id) {
  const { data } = await pokeApi.get(`/pokemon-species/${id}`)
  return data
}

// GET /type/{type} — all pokemon of a given type
export async function getPokemonByType(type) {
  const { data } = await pokeApi.get(`/type/${type}`)

  const details = []
  for (const entry of data.pokemon) {
    try {
      const { data: pokemonData } = await axios.get(entry.pokemon.url)
      details.push(formatPokemon(pokemonData))
    } catch {
      // skip if individual fetch fails
    }
  }

  return details
}

// GET /evolution-chain/{id}
export async function getEvolutionChain(url) {
  const { data } = await axios.get(url)
  return data
}
