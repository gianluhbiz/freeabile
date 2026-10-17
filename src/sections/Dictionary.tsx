import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState, type FocusEvent, type MouseEvent, type PointerEvent } from "react"
import { P, type Photo } from "../lib/data"

type Entry = { word: string; note: string; color: string; photos: Photo[] }

const ENTRIES: Entry[] = [
  { word: "Cornetto", note: "Sfornato prima delle 7, vuoto o con la crema", color: "#ecc27f", photos: [P.croissant, P.croissantCoffee, P.brioche, P.cappuccino] },
  { word: "Cappuccino", note: "Miscela Lavazza, anche con latte di soia", color: "#d9b48f", photos: [P.latteArt, P.lattePour, P.latteArt2, P.espresso] },
  { word: "Pizzoccheri", note: "Quando a Sondrio arriva il freddo", color: "#c4b59c", photos: [P.pizzoccheri, P.dough, P.pasta] },
  { word: "Lasagne", note: "Ragù d'anatra e granella di noci, 12 €", color: "#dfae7d", photos: [P.lasagna, P.pasta, P.brunch] },
  { word: "Crostata", note: "Frolla, crema e frutta di stagione", color: "#ee9f80", photos: [P.fruitTarts, P.tarts, P.chocoTart, P.bakery] },
  { word: "Cannolo", note: "Ricotta e scorza d'arancia", color: "#e7b56e", photos: [P.cannoli, P.cannoliBerries, P.pastryCounter] },
  { word: "Tiramisù", note: "Con il caffè della casa", color: "#d3ad89", photos: [P.tiramisu, P.tiramisuSlice, P.espresso] },
  { word: "Spritz", note: "Dalle 19, con il buffet", color: "#f09a5f", photos: [P.spritz, P.spritzOrange, P.spritzDuo, P.cocktail] },
  { word: "Tagliere", note: "Formaggi della valle e bresaola", color: "#e3c675", photos: [P.aperitivo, P.bar, P.bruschetta] },
  { word: "Focaccia", note: "Calda, dal nostro forno", color: "#dcbc7c", photos: [P.focaccia, P.dough, P.bruschetta] },
  { word: "Pizza", note: "Il giovedì: quattro pizze, la quinta la offriamo noi", color: "#ec8f74", photos: [P.pizza, P.margherita, P.pizzaNight] },
  { word: "Paella", note: "Serata con musica dal vivo, 35 €", color: "#eab25e", photos: [P.paellaNight, P.seaNight, P.summer] },
]

type Active = { i: number; x: number; y: number }

export function Dictionary() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState<Active | null>(null)
  const entry = active ? ENTRIES[active.i] : null

  const open = (i: number, el: HTMLElement) => {
    const box = ref.current!.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    setActive({ i, x: r.left + r.width / 2 - box.left, y: r.top - box.top })
  }

  const onEnter = (i: number) => (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "mouse") open(i, e.currentTarget)
  }
  // Taps go through click, not pointerup: a finger that moves a few pixels turns
  // pointerup into pointercancel (page scroll), which forced a second tap.
  const lastPointer = useRef("mouse")
  const onTap = (i: number) => (e: MouseEvent<HTMLButtonElement>) => {
    const keyboard = e.detail === 0
    if (!keyboard && lastPointer.current === "mouse") return // hover already handles it
    if (active?.i === i) setActive(null)
    else open(i, e.currentTarget)
  }

  // tap anywhere outside the words closes the fan
  const list = useRef<HTMLUListElement>(null)
  useEffect(() => {
    if (!active) return
    const close = (e: globalThis.PointerEvent) => {
      if (!list.current?.contains(e.target as Node)) setActive(null)
    }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setActive(null)
    document.addEventListener("pointerdown", close)
    document.addEventListener("keydown", esc)
    return () => {
      document.removeEventListener("pointerdown", close)
      document.removeEventListener("keydown", esc)
    }
  }, [active])
  // keyboard only: a tap also focuses the button and would fight with onTap
  const onFocus = (i: number) => (e: FocusEvent<HTMLButtonElement>) => {
    if (e.currentTarget.matches(":focus-visible")) open(i, e.currentTarget)
  }

  return (
    <section
      ref={ref}
      style={{ backgroundColor: entry ? entry.color : "#f3ede2" }}
      className="relative overflow-hidden px-5 py-24 transition-colors duration-500 ease-out md:px-8 md:py-36"
      aria-labelledby="dizionario-title"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4 md:mb-16">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] text-crust uppercase">Il dizionario del banco</p>
            <h2 id="dizionario-title" className="mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.9] font-bold tracking-[-0.04em] text-forest">
              Scegli una parola, <span className="font-accent font-normal">ti facciamo vedere.</span>
            </h2>
          </div>
          <p className="font-mono text-[11px] tracking-wider text-ink/50 uppercase">
            <span className="hidden md:inline">Passaci sopra col mouse</span>
            <span className="md:hidden">Tocca una parola</span>
          </p>
        </div>

        <ul
          ref={list}
          className="flex flex-wrap items-baseline gap-x-[0.35em] text-[clamp(2.6rem,8.4vw,8rem)] leading-[1.02] font-extrabold tracking-[-0.05em] text-forest"
          onPointerDown={(e) => (lastPointer.current = e.pointerType)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setActive(null)}
        >
          {ENTRIES.map((e, i) => (
            <li key={e.word} className="flex items-baseline gap-x-[0.35em]">
              <button
                type="button"
                onPointerEnter={onEnter(i)}
                onClick={onTap(i)}
                onFocus={onFocus(i)}
                aria-describedby="dizionario-note"
                className={`relative cursor-pointer touch-manipulation rounded-lg transition-colors duration-200 outline-offset-4 ${active?.i === i ? "text-ink" : ""}`}
              >
                {e.word}
                {active?.i === i && (
                  <motion.span layoutId="dict-underline" className="absolute inset-x-0 -bottom-1 h-[0.06em] rounded-full bg-ink" transition={{ type: "spring", duration: 0.4, bounce: 0.15 }} />
                )}
              </button>
              {i < ENTRIES.length - 1 && <span aria-hidden className="font-accent font-normal text-crust/60">/</span>}
            </li>
          ))}
        </ul>

        <p id="dizionario-note" aria-live="polite" className="mt-10 min-h-7 text-xl font-medium text-ink/80 md:text-2xl">
          {entry ? entry.note : "Dodici parole, dalla colazione alla cena."}
        </p>
      </div>

      {/* photo fan */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
        <AnimatePresence>
          {active &&
            entry!.photos.map((ph, k) => {
              const n = entry!.photos.length
              const s = k - (n - 1) / 2
              const spread = typeof window !== "undefined" && window.innerWidth < 768 ? 62 : 120
              return (
                <motion.img
                  key={`${active.i}-${k}`}
                  src={ph.src}
                  alt=""
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, x: "-50%", y: "-60%", rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, x: `calc(-50% + ${s * spread}px)`, y: `calc(-100% - ${18 - s * s * 14}px)`, rotate: s * 11 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                  transition={{ type: "spring", duration: 0.55, bounce: 0.22, delay: k * 0.03 }}
                  className="absolute h-36 w-28 rounded-2xl object-cover shadow-[0_24px_50px_-18px_rgb(0_0_0/0.5)] ring-4 ring-cream md:h-60 md:w-44"
                  style={{
                    left: Math.min(Math.max(active.x, 90), (ref.current?.clientWidth ?? 1000) - 90),
                    top: active.y,
                    objectPosition: ph.pos ?? "50% 50%",
                    zIndex: 10 - Math.abs(Math.round(s * 2)),
                  }}
                />
              )
            })}
        </AnimatePresence>
      </div>
    </section>
  )
}
