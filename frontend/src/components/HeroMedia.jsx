import { useRef } from "react"

export default function HeroMedia({ media }) {
  const videoRef = useRef(null)
  const isVideo = media?.type === "video"

  if (!media) return null

  return (
    <div className="absolute inset-0 -z-10">
      {isVideo ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={media.poster || media.image}
          playsInline
          muted
          loop
          autoPlay
          preload="metadata"
          onError={(e) => {
            console.error("[HeroMedia SIMPLE] <video> onError", e)
          }}
          onCanPlay={() => {
            videoRef.current?.play().catch(() => {})
          }}
          aria-hidden="true"
        >
          {media.webm && <source src={media.webm} type="video/webm" />}
          {media.mp4 &&  <source src={media.mp4}  type="video/mp4"  />}
        </video>
      ) : (
        <img
          src={media.image || media.poster}
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
    </div>
  )
}
