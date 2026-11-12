import { createContext, useContext, useEffect, useState } from 'react'
import {
  loadLocalData,
  saveLocalData,
  STORAGE_KEYS,
} from '../storage/localStorage'

const ThemeContext = createContext(null)

const palettes = {
  light: {
    background: '#F3F5F1',
    surface: '#FFFFFF',
    text: '#17231D',
    muted: '#7E8982',
    border: '#E7EBE5',
    primary: '#1dab70',
    accent: '#B9F56B',
  },
  dark: {
    background: '#111B16',
    surface: '#1B2921',
    text: '#F3F5F1',
    muted: '#A8B4AB',
    border: '#34463B',
    primary: '#B9F56B',
    accent: '#18372A',
  },
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [themeLoaded, setThemeLoaded] = useState(false)

  useEffect(() => {
    async function loadTheme() {
      const savedTheme = await loadLocalData(STORAGE_KEYS.theme, 'light')

      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme)
      }

      setThemeLoaded(true)
    }

    loadTheme()
  }, [])

  useEffect(() => {
    if (themeLoaded) {
      saveLocalData(STORAGE_KEYS.theme, theme)
    }
  }, [theme, themeLoaded])

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light'
    )
  }

  return (
    <ThemeContext.Provider
      value={{ theme, colors: palettes[theme], toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return context
}