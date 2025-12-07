import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDark(isDark)
  }, [])

  const toggle = () => {
    document.documentElement.classList.toggle('dark')
    setDark(d => !d)
  }

  return (
    <button onClick={toggle} className="btn ml-2" aria-label="Cambiar tema">
      {dark ? '🌙' : '☀️'}
    </button>
  )
}
