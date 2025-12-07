export default function TrustStrip() {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-700">
      <div className="container-px py-3 flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="text-neutral-900 dark:text-neutral-100 font-semibold">4.8/5</span>
          <span>en Google</span>
        </div>
        
        <span className="h-4 w-px bg-neutral-300 dark:bg-neutral-600 hidden sm:inline-block" />
        
        <div>+1,200 pacientes atendidos</div>
        
        <span className="h-4 w-px bg-neutral-300 dark:bg-neutral-600 hidden sm:inline-block" />
        
        <div className="text-neutral-900 dark:text-neutral-100 font-medium">Primera valoración sin costo*</div>
      </div>
    </div>
  )
}