import { useCallback, useState } from 'react'

const STORAGE_KEY = 'kiyomidai-quiz-progress-v1'

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

function save(cleared: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleared))
  } catch {
    // プライベートブラウジング等で保存できなくても遊べるようにする
  }
}

export function useProgress() {
  const [cleared, setCleared] = useState<string[]>(load)

  const clearSpot = useCallback((spotId: string) => {
    setCleared((prev) => {
      if (prev.includes(spotId)) return prev
      const next = [...prev, spotId]
      save(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setCleared([])
    save([])
  }, [])

  return { cleared, clearSpot, reset }
}
