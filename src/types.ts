export interface Question {
  q: string
  choices: string[]
  /** choices の正解インデックス (0始まり) */
  answer: number
  explanation: string
}

export interface Spot {
  id: string
  name: string
  emoji: string
  /** true のスポットは他を全クリアするまでロックされる(時計台) */
  final?: boolean
  questions: Question[]
}

export interface QuizData {
  park: {
    name: string
    /** TODO: 正確な座標に要修正(現在は概算値) */
    lat: number
    lng: number
    /** この半径(m)より遠い場合のみ注意バナーを表示 */
    radiusM: number
    geoCheckEnabled: boolean
  }
  spots: Spot[]
}
