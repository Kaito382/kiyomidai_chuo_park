import { useEffect, useState } from 'react'
import data from './data/spots.json'

/** 2点間の距離(m) — ハーバサイン公式 */
function distanceM(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

/**
 * 「ゆるい」位置チェック用バナー。
 * - 位置情報は任意。拒否・失敗・タイムアウトでも何も出さずプレイ続行。
 * - 公園から明らかに遠いときだけ、閉じられる注意バナーを出す。
 * - 判定は端末内のみ。位置情報はどこにも送信・保存しない。
 */
export function GeoBanner() {
  const [farAway, setFarAway] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!data.park.geoCheckEnabled || !('geolocation' in navigator)) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const d = distanceM(
          pos.coords.latitude,
          pos.coords.longitude,
          data.park.lat,
          data.park.lng,
        )
        if (d > data.park.radiusM) setFarAway(true)
      },
      () => {
        /* 拒否・失敗は無視してそのまま遊べる */
      },
      { timeout: 5000, maximumAge: 60000 },
    )
  }, [])

  if (!farAway || dismissed) return null

  return (
    <div className="geo-banner" role="status">
      <span>
        📍 {data.park.name}から離れた場所にいるようです。公園で遊ぶともっと楽しめます!
      </span>
      <button
        className="geo-banner-close"
        onClick={() => setDismissed(true)}
        aria-label="閉じる"
      >
        ✕
      </button>
    </div>
  )
}
