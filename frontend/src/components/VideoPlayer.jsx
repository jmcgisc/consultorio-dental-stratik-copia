export default function VideoPlayer({ mp4, webm, poster, caption }) {
  return (
    <figure className="card overflow-hidden">
      <video
        className="w-full rounded-xl"
        controls
        playsInline
        preload="metadata"
        poster={poster}
      >
        {webm && <source src={webm} type="video/webm" />}
        {mp4  && <source src={mp4}  type="video/mp4" />}
        Tu navegador no soporta video HTML5.
      </video>
      {caption && <figcaption className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{caption}</figcaption>}
    </figure>
  )
}
