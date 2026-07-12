import { useState } from 'react'
import rawData from './data/spots.json'
import type { QuizData } from './types'
import { useProgress } from './useProgress'
import { Home } from './Home'
import { QuizView } from './QuizView'
import { ClockTowerCelebration } from './ClockTowerCelebration'
import { GeoBanner } from './GeoBanner'

const data = rawData as QuizData

type View =
  | { type: 'home' }
  | { type: 'quiz'; spotId: string }
  | { type: 'locked'; spotId: string }
  | { type: 'celebration' }

/** QRコードのURL (?spot_id=hippo など) から初期表示スポットを決める */
function initialView(): View {
  const spotId = new URLSearchParams(window.location.search).get('spot_id')
  if (spotId && data.spots.some((s) => s.id === spotId)) {
    return { type: 'quiz', spotId }
  }
  return { type: 'home' }
}

export default function App() {
  const [view, setView] = useState<View>(initialView)
  const { cleared, clearSpot, reset } = useProgress()

  const normalSpots = data.spots.filter((s) => !s.final)
  const finalUnlocked = normalSpots.every((s) => cleared.includes(s.id))

  function goHome() {
    // QRから来た場合もホームに戻ったらクエリを消しておく(リロードでクイズに戻らないように)
    window.history.replaceState(null, '', window.location.pathname)
    setView({ type: 'home' })
  }

  function openSpot(spotId: string) {
    const spot = data.spots.find((s) => s.id === spotId)
    if (!spot) return
    if (spot.final && !finalUnlocked) {
      setView({ type: 'locked', spotId })
    } else {
      setView({ type: 'quiz', spotId })
    }
  }

  function handleComplete(spotId: string) {
    clearSpot(spotId)
    const spot = data.spots.find((s) => s.id === spotId)
    if (spot?.final) {
      setView({ type: 'celebration' })
    }
    // 通常スポットは QuizView 内の「スタンプゲット!」画面を表示したままにする
  }

  let content
  switch (view.type) {
    case 'home':
      content = (
        <Home
          parkName={data.park.name}
          spots={data.spots}
          cleared={cleared}
          onSelectSpot={openSpot}
          onReset={reset}
        />
      )
      break
    case 'quiz': {
      const spot = data.spots.find((s) => s.id === view.spotId)!
      // QRから直接ロック中の時計台に来た場合もロック画面へ
      if (spot.final && !finalUnlocked && !cleared.includes(spot.id)) {
        content = <LockedScreen remaining={normalSpots.filter((s) => !cleared.includes(s.id)).map((s) => s.name)} onBack={goHome} />
      } else {
        content = <QuizView key={spot.id} spot={spot} onComplete={handleComplete} onBack={goHome} />
      }
      break
    }
    case 'locked':
      content = (
        <LockedScreen
          remaining={normalSpots.filter((s) => !cleared.includes(s.id)).map((s) => s.name)}
          onBack={goHome}
        />
      )
      break
    case 'celebration':
      content = <ClockTowerCelebration onBackHome={goHome} />
      break
  }

  return (
    <div className="app">
      <GeoBanner />
      {content}
    </div>
  )
}

function LockedScreen({ remaining, onBack }: { remaining: string[]; onBack: () => void }) {
  return (
    <div className="screen locked-screen">
      <span className="locked-emoji">🔒</span>
      <h2>時計台はまだひみつ…</h2>
      <p>
        ほかのスポットのスタンプを全部あつめると、
        <br />
        時計台のクイズにちょうせんできるよ!
      </p>
      <div className="locked-remaining">
        <p>のこりのスポット:</p>
        <ul>
          {remaining.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <button className="primary-button" onClick={onBack}>
        スタンプ帳を見る
      </button>
    </div>
  )
}
