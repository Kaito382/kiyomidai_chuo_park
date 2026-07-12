import { useState } from 'react'
import type { Spot } from './types'
import { Tanuki } from './Tanuki'

interface Props {
  spot: Spot
  onComplete: (spotId: string) => void
  onBack: () => void
}

/** Fisher–Yates シャッフルで 0〜n-1 のランダムな並びを作る */
function shuffledOrder(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function QuizView({ spot, onComplete, onBack }: Props) {
  const [index, setIndex] = useState(0)
  // selected と order はどちらも「元データ (choices) のインデックス」で持つ
  const [selected, setSelected] = useState<number | null>(null)
  const [order, setOrder] = useState(() => shuffledOrder(spot.questions[0].choices.length))
  const [finished, setFinished] = useState(false)

  const question = spot.questions[index]
  const isLast = index === spot.questions.length - 1
  const answered = selected !== null
  const correct = answered && selected === question.answer

  function choose(i: number) {
    if (answered) return
    setSelected(i)
  }

  function next() {
    if (isLast) {
      setFinished(true)
      onComplete(spot.id)
    } else {
      setIndex(index + 1)
      setSelected(null)
      setOrder(shuffledOrder(spot.questions[index + 1].choices.length))
    }
  }

  if (finished) {
    return (
      <div className="screen quiz-finished">
        <div className="stamp-get">
          <span className="stamp-get-emoji">{spot.emoji}</span>
          <h2>スタンプゲット!</h2>
          <p>「{spot.name}」のクイズをクリアしました!</p>
          <Tanuki mood="happy" className="stamp-tanuki" />
        </div>
        <button className="primary-button" onClick={onBack}>
          スタンプ帳にもどる
        </button>
      </div>
    )
  }

  return (
    <div className="screen">
      <header className="quiz-header">
        <button className="back-button" onClick={onBack} aria-label="もどる">
          ←
        </button>
        <div>
          <p className="quiz-spot-name">
            {spot.emoji} {spot.name}
          </p>
          <p className="quiz-progress">
            もんだい {index + 1} / {spot.questions.length}
          </p>
        </div>
      </header>

      <h2 className="quiz-question">{question.q}</h2>

      <div className="choices">
        {order.map((i) => {
          let cls = 'choice'
          if (answered) {
            if (i === question.answer) cls += ' choice-correct'
            else if (i === selected) cls += ' choice-wrong'
            else cls += ' choice-dim'
          }
          return (
            <button key={i} className={cls} onClick={() => choose(i)} disabled={answered}>
              {question.choices[i]}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`feedback ${correct ? 'feedback-correct' : 'feedback-wrong'}`}>
          <div className="feedback-head">
            <Tanuki mood={correct ? 'happy' : 'sad'} className="feedback-tanuki" />
            <p className="feedback-result">{correct ? '⭕ せいかい!' : '❌ ざんねん…'}</p>
          </div>
          <p className="feedback-explanation">{question.explanation}</p>
          <button className="primary-button" onClick={next}>
            {isLast ? 'スタンプをもらう' : 'つぎの問題へ'}
          </button>
        </div>
      )}
    </div>
  )
}
