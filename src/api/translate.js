import axios from 'axios'

const CACHE_KEY = 'pokedex-translations'

function getCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || {}
  } catch {
    return {}
  }
}

function setCache(cache) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
}

export async function translateText(text, from = 'en', to = 'vi') {
  if (!text) return text

  // Check cache first
  const cache = getCache()
  const cacheKey = `${from}:${to}:${text}`
  if (cache[cacheKey]) return cache[cacheKey]

  try {
    const { data } = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: `${from}|${to}`,
      },
    })

    const translated = data.responseData?.translatedText
    if (translated && data.responseStatus === 200) {
      // Save to cache
      cache[cacheKey] = translated
      setCache(cache)
      return translated
    }

    return text // fallback to original
  } catch {
    return text // fallback on error
  }
}
