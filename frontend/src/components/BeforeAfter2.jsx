import { useId, useState } from "react"

export default function BeforeAfter2({ before, after, labelBefore="Antes", labelAfter="Después" }) {
  const id = useId()
  const [pos, setPos] = useState(50)

  return (
    <div className="card overflow-hidden">
      <div className="relative w-full aspect-[16/10] select-none">
        <img src={before} alt={labelBefore} className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden="true"
        >
          <img src={after} alt={labelAfter} className="h-full w-full object-cover" />
        </div>

        {/* etiquetas */}
        <span className="absolute left-3 top-3 rounded-full bg-black/60 text-white text-xs px-2 py-1">{labelBefore}</span>
        <span className="absolute right-3 top-3 rounded-full bg-black/60 text-white text-xs px-2 py-1">{labelAfter}</span>

        {/* slider */}
        <input
          id={id}
          type="range"
          min="0" max="100" value={pos}
          onChange={(e)=>setPos(+e.target.value)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[60%]"
          aria-label="Comparar antes y después"
        />
      </div>
    </div>
  )
}
