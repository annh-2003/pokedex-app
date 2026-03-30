import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import en from '../i18n/en'
import vi from '../i18n/vi'

const languages = { en, vi }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('pokedex-lang') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('pokedex-lang', lang)
  }, [lang])

  const t = useCallback(
    (key) => {
      return languages[lang]?.[key] || languages.en[key] || key
    },
    [lang]
  )

  function toggleLanguage() {
    setLang((prev) => (prev === 'en' ? 'vi' : 'en'))
  }

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
