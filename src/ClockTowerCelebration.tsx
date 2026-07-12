import { useMemo, useState } from 'react'
import { Tanuki } from './Tanuki'

interface Props {
  onBackHome: () => void
}

const CHARGE_PER_TAP = 12

/**
 * コンプリート演出。
 * Phase 1 では画面上のハンドルをタップして時計台を回す。
 * (将来フェーズで実物の手回しハンドル連携に置き換える想定)
 */
export function ClockTowerCelebration({ onBackHome }: Props) {
  const [power, setPower] = useState(0)
  const done = power >= 100

  // 針の回転角: パワーに応じてぐるぐる回る
  const minuteAngle = power * 10.8 // 100% で 3 回転
  const hourAngle = power * 0.9

  const confetti = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        delay: `${((i * 13) % 20) / 10}s`,
        color: ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#8e24aa'][i % 6],
      })),
    [],
  )

  function crank() {
    if (done) return
    setPower((p) => Math.min(100, p + CHARGE_PER_TAP))
  }

  return (
    <div className="screen celebration">
      {done &&
        confetti.map((c, i) => (
          <span
            key={i}
            className="confetti"
            style={{ left: c.left, animationDelay: c.delay, backgroundColor: c.color }}
          />
        ))}

      <h2 className="celebration-title">
        {done ? '🎉 コンプリート! 🎉' : '時計台を回そう!'}
      </h2>

      <svg viewBox="0 0 120 200" className="clock-tower" aria-hidden="true">
        {/* 屋根 */}
        <polygon points="60,8 30,48 90,48" fill="#c62828" />
        {/* 塔身 */}
        <rect x="38" y="48" width="44" height="130" fill="#efe3c8" stroke="#8d6e63" strokeWidth="2" />
        {/* 文字盤 */}
        <circle cx="60" cy="80" r="20" fill="#fff" stroke="#37474f" strokeWidth="3" />
        {/* 針 (パワーに応じて回転) */}
        <line
          x1="60"
          y1="80"
          x2="60"
          y2="66"
          stroke="#37474f"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle} 60 80)`}
          style={{ transition: 'transform 0.3s ease-out' }}
        />
        <line
          x1="60"
          y1="80"
          x2="60"
          y2="71"
          stroke="#c62828"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${hourAngle} 60 80)`}
          style={{ transition: 'transform 0.3s ease-out' }}
        />
        {/* 扉 */}
        <rect x="52" y="140" width="16" height="38" rx="8" fill="#8d6e63" />
      </svg>

      {!done ? (
        <>
          <div className="power-bar">
            <div className="power-bar-fill" style={{ width: `${power}%` }} />
          </div>
          <button className="crank-button" onClick={crank}>
            🔄 ハンドルをまわす!
          </button>
          <p className="celebration-hint">連打して時計台の針をぐるぐる回そう!</p>
        </>
      ) : (
        <>
          <Tanuki mood="happy" className="celebration-tanuki" />
          <p className="celebration-message">
            全スポットクリアおめでとう!
            <br />
            きみの力で時計台が回りました!
            <br />
            木更津のまちにも遊びに行ってみてね。
          </p>
          <button className="primary-button" onClick={onBackHome}>
            スタンプ帳にもどる
          </button>
        </>
      )}
    </div>
  )
}
