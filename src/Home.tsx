import type { Spot } from './types'
import { Hero } from './Hero'
import { Tanuki } from './Tanuki'

interface Props {
  parkName: string
  spots: Spot[]
  cleared: string[]
  onSelectSpot: (spotId: string) => void
  onReset: () => void
}

function tanukiMessage(
  stampCount: number,
  remaining: number,
  finalUnlocked: boolean,
  allDone: boolean,
): string {
  if (allDone) return 'コンプリートおめでとう!木更津のまちにも、また公園にもあそびにきてね!'
  if (finalUnlocked) return 'やったね、時計台がかいほうされたよ!さいごのクイズにちょうせんだ!'
  if (stampCount === 0) {
    return 'ようこそ!ぼくはガイドの「ぽんた」!公園の中のQRコードを見つけて、クイズにちょうせんしよう!'
  }
  return `その調子!スタンプはあと${remaining}個だよ。つぎのQRコードをさがそう!`
}

export function Home({ parkName, spots, cleared, onSelectSpot, onReset }: Props) {
  const normalSpots = spots.filter((s) => !s.final)
  const finalSpot = spots.find((s) => s.final)
  const finalUnlocked = normalSpots.every((s) => cleared.includes(s.id))
  const stampCount = spots.filter((s) => cleared.includes(s.id)).length
  const allDone = stampCount === spots.length
  const remaining = normalSpots.filter((s) => !cleared.includes(s.id)).length

  return (
    <div className="screen">
      <Hero parkName={parkName} />

      <div className="guide">
        <Tanuki mood={allDone || finalUnlocked ? 'happy' : 'normal'} className="guide-tanuki" />
        <p className="bubble">{tanukiMessage(stampCount, remaining, finalUnlocked, allDone)}</p>
      </div>

      <div className="stamp-summary">
        スタンプ <strong>{stampCount}</strong> / {spots.length}
        {allDone && <span className="stamp-complete-badge">コンプリート🎉</span>}
      </div>

      <div className="spot-grid">
        {normalSpots.map((spot) => {
          const done = cleared.includes(spot.id)
          return (
            <button
              key={spot.id}
              className={`spot-card ${done ? 'spot-card-done' : ''}`}
              onClick={() => onSelectSpot(spot.id)}
            >
              <span className="spot-emoji">{spot.emoji}</span>
              <span className="spot-name">{spot.name}</span>
              <span className="spot-state">{done ? '✅ クリア!' : 'クイズにちょうせん'}</span>
            </button>
          )
        })}

        {finalSpot && (
          <button
            className={`spot-card spot-card-final ${
              cleared.includes(finalSpot.id)
                ? 'spot-card-done'
                : finalUnlocked
                  ? 'spot-card-unlocked'
                  : 'spot-card-locked'
            }`}
            onClick={() => onSelectSpot(finalSpot.id)}
          >
            <span className="spot-emoji">{finalUnlocked ? finalSpot.emoji : '🔒'}</span>
            <span className="spot-name">{finalSpot.name}</span>
            <span className="spot-state">
              {cleared.includes(finalSpot.id)
                ? '✅ クリア!'
                : finalUnlocked
                  ? '✨ かいほうされた!'
                  : `ほかのスタンプを集めるとかいほう`}
            </span>
          </button>
        )}
      </div>

      <p className="home-note">
        ※ 本当は公園の各スポットにあるQRコードを読み取って遊びます。
        この画面のカードタップはデモ用です。
      </p>

      {stampCount > 0 && (
        <button
          className="reset-button"
          onClick={() => {
            if (window.confirm('スタンプを全部消して、はじめからやり直しますか?')) {
              onReset()
            }
          }}
        >
          はじめからやり直す
        </button>
      )}
    </div>
  )
}
