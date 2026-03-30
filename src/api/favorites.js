// Team CRUD using localStorage (works offline, no server needed)
const STORAGE_KEY = 'pokedex-team'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function writeStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export async function getFavorites() {
  return readStorage()
}

export async function addFavorite(member) {
  const favorites = readStorage()
  const saved = { ...member, id: generateId() }
  favorites.push(saved)
  writeStorage(favorites)
  return saved
}

export async function updateFavorite(id, data) {
  const favorites = readStorage()
  const index = favorites.findIndex((m) => m.id === id)
  if (index === -1) throw new Error('Not found')
  favorites[index] = { ...data, id }
  writeStorage(favorites)
  return favorites[index]
}

export async function deleteFavorite(id) {
  const favorites = readStorage()
  writeStorage(favorites.filter((m) => m.id !== id))
}
