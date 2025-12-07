// ⚠️ TEMPORAL: desactivar Supabase para encontrar referencias
export const supabase = {
  from() {
    console.trace("[TEMP] Alguien llamó a supabase.from(...) — elimina esta referencia")
    return {
      insert() {
        throw new Error("[TEMP] Supabase desactivado. Quita la llamada en este componente.")
      }
    }
  }
}
