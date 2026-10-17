import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useRef, useState, type PointerEvent, type ReactNode } from "react"
import { ALL_PHOTOS, HOURS, INFO } from "../lib/data"
import { EASE_OUT } from "../lib/motion"
import { StatusPill } from "../components/Nav"

type Trail = { id: number; x: number; y: number; src: string; r: number }

export function Visit() {
  const reduce = useReducedMotion()
  const [trail, setTrail] = useState<Trail[]>([])
  const last = useRef({ x: 0, y: 0 })
  const count = useRef(0)

  // drop a photo every ~110px of mouse travel: a trail of everything we cook
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (Math.hypot(x - last.current.x, y - last.current.y) < 110) return
    last.current = { x, y }
    const id = count.current++
    const src = ALL_PHOTOS[id % ALL_PHOTOS.length].src
    setTrail((t) => [...t.slice(-9), { id, x, y, src, r: ((id * 37) % 24) - 12 }])
    setTimeout(() => setTrail((t) => t.filter((p) => p.id !== id)), 900)
  }

  return (
    <section
      id="visita"
      onPointerMove={onMove}
      className="relative overflow-hidden bg-forest px-5 pt-24 pb-10 text-paper md:px-8 md:pt-36"
      aria-labelledby="visita-title"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <AnimatePresence>
          {trail.map((t) => (
            <motion.img
              key={t.id}
              src={t.src}
              alt=""
              initial={{ opacity: 0, scale: 0.6, rotate: t.r - 10 }}
              animate={{ opacity: 1, scale: 1, rotate: t.r }}
              exit={{ opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.4 } }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="absolute h-44 w-36 -translate-x-1/2 -translate-y-1/2 rounded-xl object-cover shadow-2xl"
              style={{ left: t.x, top: t.y }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="font-mono text-xs tracking-[0.25em] text-apricot uppercase">Dove siamo</p>
        <h2 id="visita-title" className="mt-5 text-[clamp(3.2rem,11vw,10rem)] leading-[0.84] font-bold tracking-[-0.05em]">
          Passa
          <br />
          <span className="font-accent font-normal text-apricot">a trovarci.</span>
        </h2>
        <p className="mt-6 hidden font-mono text-xs tracking-wider text-paper/40 uppercase md:block">
          <i className="ri-cursor-line" aria-hidden /> Muovi il mouse qui sopra
        </p>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-paper/12 md:mt-24 md:grid-cols-3">
          <Block icon="ri-map-pin-2-line" title="Indirizzo">
            <p className="text-xl font-semibold">{INFO.address}</p>
            <p className="text-paper/60">{INFO.city}, centro città</p>
            <a href={INFO.maps} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 font-semibold text-apricot underline-offset-4 hover:underline">
              Indicazioni stradali <i className="ri-arrow-right-up-line" aria-hidden />
            </a>
          </Block>
          <Block icon="ri-time-line" title="Orari">
            <ul className="flex flex-col gap-2">
              {HOURS.map((h) => (
                <li key={h.day} className="flex flex-col">
                  <span className="text-paper/60">{h.day}</span>
                  <span className="font-mono text-lg font-semibold">{h.time}</span>
                </li>
              ))}
            </ul>
            <StatusPill className="mt-4 text-paper/80" />
          </Block>
          <Block icon="ri-phone-line" title="Prenotazioni">
            <a href={INFO.phoneHref} className="text-xl font-semibold underline-offset-4 hover:underline">
              {INFO.phone}
            </a>
            <p className="text-paper/60">Per le serate del giovedì e i gruppi</p>
            <a href={INFO.instagram} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 font-semibold text-apricot underline-offset-4 hover:underline">
              <i className="ri-instagram-line" aria-hidden /> @freeabile.sondrio
            </a>
          </Block>
        </div>

        <footer className="mt-24 flex flex-col gap-6 border-t border-paper/15 pt-8 text-sm text-paper/50 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/img/logo.jpg" alt="" className="size-10 rounded-full" />
            <span>
              Freeabile · Bar, pasticceria, bistrot · Sondrio
              <br />
              Un progetto di inclusione lavorativa
            </span>
          </div>
          <p>Developed and Designed by <a href="https://gianluh.dev" rel="noreferrer" target="_blank" className="font-bold underline">Gianluca De Maio <i className="ri-external-link-line"></i></a></p>
          <p className="font-mono text-xs">© {new Date().getFullYear()} Freeabile · alcune foto Unsplash</p>
        </footer>
      </div>
    </section>
  )
}

function Block({ icon, title, children }: { icon: string; title: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="flex flex-col gap-1 bg-forest p-7 md:p-9"
    >
      <span className="mb-5 flex items-center gap-2 font-mono text-xs tracking-wider text-paper/50 uppercase">
        <i className={`${icon} text-base text-apricot`} aria-hidden /> {title}
      </span>
      {children}
    </motion.div>
  )
}
