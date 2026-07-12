export type TanukiMood = 'normal' | 'happy' | 'sad'

interface Props {
  mood?: TanukiMood
  className?: string
}

/**
 * 案内役のオリジナルタヌキ「ぽんた」。
 * 證誠寺の狸ばやし伝説にちなんだキャラクター
 * (市公認キャラ「きさぽん」は許諾が必要なため、デモではオリジナルを使う)
 */
export function Tanuki({ mood = 'normal', className }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {/* しっぽ */}
      <ellipse cx="97" cy="92" rx="16" ry="12" fill="#7a5c48" />
      <ellipse cx="104" cy="90" rx="7" ry="6" fill="#4e342e" />
      {/* 耳 */}
      <circle cx="38" cy="26" r="10" fill="#7a5c48" />
      <circle cx="82" cy="26" r="10" fill="#7a5c48" />
      <circle cx="38" cy="27" r="5" fill="#4e342e" />
      <circle cx="82" cy="27" r="5" fill="#4e342e" />
      {/* 体 */}
      <ellipse cx="60" cy="88" rx="30" ry="26" fill="#8d6e5a" />
      {/* 足 */}
      <ellipse cx="46" cy="112" rx="9" ry="6" fill="#7a5c48" />
      <ellipse cx="74" cy="112" rx="9" ry="6" fill="#7a5c48" />
      {/* おなか */}
      <ellipse cx="60" cy="94" rx="17" ry="15" fill="#f2e3cd" />
      {/* 手 */}
      <ellipse cx="37" cy="84" rx="7" ry="10" fill="#8d6e5a" transform="rotate(20 37 84)" />
      <ellipse cx="83" cy="84" rx="7" ry="10" fill="#8d6e5a" transform="rotate(-20 83 84)" />
      {/* 頭 */}
      <circle cx="60" cy="48" r="28" fill="#a58468" />
      {/* 頭の葉っぱ */}
      <g transform="rotate(-18 60 21)">
        <ellipse cx="60" cy="19" rx="11" ry="6" fill="#66bb6a" />
        <line x1="60" y1="19" x2="60" y2="27" stroke="#388e3c" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* 目のまわりの模様 */}
      <ellipse cx="47" cy="46" rx="9" ry="7.5" fill="#5d4037" />
      <ellipse cx="73" cy="46" rx="9" ry="7.5" fill="#5d4037" />
      {/* 目 (表情で変化) */}
      {mood === 'happy' ? (
        <>
          <path d="M43 47 q4 -5 8 0" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M69 47 q4 -5 8 0" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ) : mood === 'sad' ? (
        <>
          <path d="M43 45 q4 5 8 0" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M69 45 q4 5 8 0" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="52" cy="53" r="2.2" fill="#81d4fa" />
        </>
      ) : (
        <>
          <circle cx="47" cy="46" r="3.2" fill="#fff" />
          <circle cx="73" cy="46" r="3.2" fill="#fff" />
        </>
      )}
      {/* マズル */}
      <ellipse cx="60" cy="58" rx="12" ry="9" fill="#f2e3cd" />
      <circle cx="60" cy="54" r="3.5" fill="#4e342e" />
      {/* 口 (表情で変化) */}
      {mood === 'happy' ? (
        <path d="M54 60 q6 7 12 0" stroke="#4e342e" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : mood === 'sad' ? (
        <path d="M55 64 q5 -5 10 0" stroke="#4e342e" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M57 61 q3 3.5 6 0" stroke="#4e342e" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}
      {/* ほっぺ */}
      <circle cx="37" cy="57" r="4.5" fill="#ef9a9a" opacity="0.8" />
      <circle cx="83" cy="57" r="4.5" fill="#ef9a9a" opacity="0.8" />
    </svg>
  )
}
