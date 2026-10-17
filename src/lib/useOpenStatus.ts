import { useEffect, useState } from "react"

type Status = { open: boolean; label: string }

// Mon 07–16, every other day 07–22 (Europe/Rome)
function compute(now: Date): Status {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Rome",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ""
  const minutes = Number(get("hour")) * 60 + Number(get("minute"))
  const close = get("weekday") === "Mon" ? 16 : 22

  if (minutes < 7 * 60) return { open: false, label: "Chiuso · apre alle 7:00" }
  if (minutes < close * 60) return { open: true, label: `Aperto ora · fino alle ${close}:00` }
  return { open: false, label: "Chiuso · domani dalle 7:00" }
}

export function useOpenStatus() {
  const [status, setStatus] = useState(() => compute(new Date()))
  useEffect(() => {
    const id = setInterval(() => setStatus(compute(new Date())), 60_000)
    return () => clearInterval(id)
  }, [])
  return status
}
