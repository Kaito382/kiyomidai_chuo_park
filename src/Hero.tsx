/**
 * ホーム上部のヒーロービジュアル。
 * 東京湾に沈む夕日・対岸の富士山・中の島大橋(赤いアーチ橋)のシルエットで
 * 「木更津の公園のアプリ」であることをひと目で伝える。
 */
export function Hero({ parkName }: { parkName: string }) {
  return (
    <div className="hero">
      <svg
        viewBox="0 0 360 150"
        preserveAspectRatio="xMidYMax slice"
        className="hero-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a90d9" />
            <stop offset="60%" stopColor="#ffb74d" />
            <stop offset="100%" stopColor="#ffe082" />
          </linearGradient>
        </defs>

        {/* 空 */}
        <rect width="360" height="100" fill="url(#hero-sky)" />

        {/* 対岸の富士山 */}
        <path d="M10 100 L38 78 L46 83 L54 78 L82 100 Z" fill="#90a4d4" opacity="0.85" />

        {/* 夕日 */}
        <circle cx="112" cy="86" r="14" fill="#ff7043" />

        {/* カモメ */}
        <path d="M150 56 q5 -6 10 0 M160 56 q5 -6 10 0" stroke="#37474f" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M185 44 q4 -5 8 0 M193 44 q4 -5 8 0" stroke="#37474f" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* 海 */}
        <rect y="100" width="360" height="50" fill="#1e6fa8" />

        {/* 中の島大橋(赤いアーチ橋・日本一高い歩道橋) */}
        <g fill="none" strokeLinecap="round">
          <path d="M205 100 Q280 26 355 100" stroke="#e53935" strokeWidth="3" />
          <path d="M205 100 Q280 36 355 100" stroke="#c62828" strokeWidth="6" />
          <line x1="231" y1="82" x2="231" y2="100" stroke="#c62828" strokeWidth="3" />
          <line x1="329" y1="82" x2="329" y2="100" stroke="#c62828" strokeWidth="3" />
        </g>

        {/* 波 (2層のループアニメーション) */}
        <path
          className="wave wave-front"
          d="M-60 104 Q-45 99 -30 104 T0 104 T30 104 T60 104 T90 104 T120 104 T150 104 T180 104 T210 104 T240 104 T270 104 T300 104 T330 104 T360 104 T390 104 T420 104 T450 104 T480 104 L480 150 L-60 150 Z"
          fill="#2b8ac2"
        />
        <path
          className="wave wave-back"
          d="M-80 112 Q-60 106 -40 112 T0 112 T40 112 T80 112 T120 112 T160 112 T200 112 T240 112 T280 112 T320 112 T360 112 T400 112 T440 112 T480 112 L480 150 L-80 150 Z"
          fill="#5fb0dc"
          opacity="0.65"
        />
      </svg>

      <div className="hero-text">
        <p className="hero-park">{parkName}</p>
        <h1 className="hero-title">
          きさらづ
          <br />
          クイズラリー
        </h1>
      </div>
    </div>
  )
}
