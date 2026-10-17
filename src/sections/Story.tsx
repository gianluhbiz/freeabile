import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from "react"
import { INFO, P, type Photo } from "../lib/data"
import { EASE_IN_OUT, EASE_OUT } from "../lib/motion"

const JOBS = ["barista", "pasticcere", "cameriere"]

export function Story() {
  return (
    <section id="storia" className="relative bg-night px-5 pt-28 pb-24 text-paper md:px-8 md:pt-40 md:pb-36" aria-labelledby="storia-title">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <h2 id="storia-title" className="font-mono text-xs tracking-[0.25em] text-apricot uppercase">
            Abilità liberate
          </h2>
          <p className="font-mono text-sm tracking-wider text-paper/60">{INFO.hashtag}</p>
        </div>

        <StoryText />

        <Stats />

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="mt-20 grid gap-8 border-t border-paper/15 pt-10 md:mt-28 md:grid-cols-[1fr_auto] md:items-end"
        >
          <p className="font-accent text-[clamp(2rem,5vw,4.5rem)] leading-[1.05]">
            “{INFO.claim}.”
          </p>
          <footer className="font-mono text-xs tracking-wider text-paper/50 uppercase">Dalla bio Instagram</footer>
        </motion.blockquote>
      </div>
    </section>
  )
}

type Floating = Photo & { cls: string; r: number; depth: number }

const AROUND: Floating[] = [
  { ...P.barista, cls: "-left-6 top-0 w-40 aspect-[4/5]", r: -7, depth: 26 },
  { ...P.dough, cls: "-right-4 top-10 w-36 aspect-square", r: 6, depth: 40 },
  { ...P.bar, cls: "left-2 bottom-0 w-36 aspect-[3/4]", r: 5, depth: 34 },
  { ...P.focaccia, cls: "-right-6 bottom-4 w-44 aspect-[4/3]", r: -5, depth: 22 },
]

function StoryText() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 70, damping: 16 })
  const sy = useSpring(my, { stiffness: 70, damping: 16 })
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <div onPointerMove={onMove} className="relative lg:px-44 lg:py-20 xl:px-52">
      {/* mobile: a small strip of faces above the text */}
      <div className="mb-10 flex justify-center -space-x-4 lg:hidden">
        {AROUND.map((ph, i) => (
          <motion.img
            key={ph.src}
            src={ph.src}
            alt={ph.alt}
            loading="lazy"
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: ph.r }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.7, bounce: 0.3, delay: i * 0.08 }}
            className="size-20 rounded-2xl object-cover ring-4 ring-night sm:size-24"
          />
        ))}
      </div>

      {AROUND.map((ph, i) => (
        <AroundPhoto key={ph.src} ph={ph} i={i} sx={sx} sy={sy} />
      ))}

      <p className="relative text-center text-[clamp(1.7rem,3.3vw,3rem)] leading-[1.25] font-semibold tracking-[-0.03em] text-balance">
        Freeabile nasce a Sondrio da <Mark i={0}>Buona Visione</Mark>, un'impresa sociale. Dietro al banco{" "}
        <Mark i={1}>ragazze e ragazzi con disabilità</Mark> imparano a fare il <Jobs />. Da quest'estate in cucina c'è
        anche la famiglia di <Mark i={2}>Tofi e Nabil</Mark>: lui cuoco, pasticcere e panificatore, lei instancabile,
        quattro figli che danno una mano come possono.
      </p>
    </div>
  )
}

function AroundPhoto({ ph, i, sx, sy }: { ph: Floating; i: number; sx: MotionValue<number>; sy: MotionValue<number> }) {
  const x = useTransform(sx, (v) => v * ph.depth)
  const y = useTransform(sy, (v) => v * ph.depth)
  return (
    <motion.div style={{ x, y }} className={`absolute hidden lg:block ${ph.cls}`}>
      <motion.img
        src={ph.src}
        alt={ph.alt}
        loading="lazy"
        draggable={false}
        initial={{ opacity: 0, y: 60, rotate: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, rotate: ph.r, scale: 1 }}
        whileHover={{ rotate: 0, scale: 1.06 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ type: "spring", duration: 0.8, bounce: 0.25, delay: 0.1 + i * 0.1 }}
        className="size-full rounded-2xl object-cover shadow-[0_30px_60px_-25px_rgb(0_0_0/0.7)]"
        style={{ objectPosition: ph.pos ?? "50% 50%" }}
      />
    </motion.div>
  )
}

// highlighter stroke painted behind the words, left to right, once
function Mark({ i, children }: { i: number; children: ReactNode }) {
  return (
    <motion.span
      initial="off"
      whileInView="on"
      viewport={{ once: true, margin: "-15% 0px" }}
      className="relative inline whitespace-nowrap"
    >
      <motion.span
        aria-hidden
        variants={{ off: { scaleX: 0 }, on: { scaleX: 1, transition: { duration: 0.7, delay: 0.25 + i * 0.35, ease: EASE_IN_OUT } } }}
        className="absolute -inset-x-[0.12em] top-[0.12em] bottom-[0.02em] -z-0 origin-left -rotate-1 rounded-[0.2em] bg-apricot"
      />
      <motion.span
        variants={{ off: { color: "#f3ede2" }, on: { color: "#13241c", transition: { duration: 0.3, delay: 0.5 + i * 0.35 } } }}
        className="relative"
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

// the job word rolls every couple of seconds while the paragraph is on screen
function Jobs() {
  const [i, setI] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { margin: "-20% 0px" })
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!inView || reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % JOBS.length), 2200)
    return () => clearInterval(t)
  }, [inView, reduce])

  // measure every word once so the slot can resize to the current one
  const measure = useRef<HTMLSpanElement>(null)
  const [widths, setWidths] = useState<number[]>([])
  useLayoutEffect(() => {
    const el = measure.current
    if (!el) return
    const read = () => setWidths([...el.children].map((c) => (c as HTMLElement).offsetWidth))
    read()
    document.fonts.ready.then(read)
    window.addEventListener("resize", read)
    return () => window.removeEventListener("resize", read)
  }, [])

  return (
    <motion.span
      ref={ref}
      animate={widths.length ? { width: widths[i] } : undefined}
      transition={{ duration: 0.5, ease: EASE_IN_OUT }}
      className="relative inline-grid overflow-hidden text-left align-bottom"
    >
      <span ref={measure} aria-hidden className="pointer-events-none invisible absolute top-0 left-0 flex whitespace-nowrap">
        {JOBS.map((j) => (
          <span key={j} className="font-accent font-normal">
            {j}
          </span>
        ))}
      </span>
      <span aria-hidden className="invisible col-start-1 row-start-1 font-accent font-normal">
        {JOBS[0]}
      </span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={JOBS[i]}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.55, ease: EASE_IN_OUT }}
          className="col-start-1 row-start-1 font-accent font-normal whitespace-nowrap text-apricot"
        >
          {JOBS[i]}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">barista, pasticcere, cameriere</span>
    </motion.span>
  )
}

const STATS = [
  { n: 4.7, d: 1, suffix: "", label: "su Google", sub: `${INFO.reviews} recensioni` },
  { n: 15, d: 0, suffix: "h", label: "di bancone aperto", sub: "dalle 7 alle 22, martedì › domenica" },
  { n: 7, d: 0, suffix: "/7", label: "giorni su sette", sub: "lunedì fino alle 16" },
]

function Stats() {
  return (
    <dl className="mt-20 grid gap-px overflow-hidden rounded-3xl bg-paper/10 md:mt-28 md:grid-cols-3">
      {STATS.map((s, i) => (
        <div key={s.label} className="flex flex-col gap-2 bg-night p-7 md:p-9">
          <dt className="sr-only">{s.label}</dt>
          <dd className="flex items-baseline gap-1 font-mono text-6xl font-semibold tracking-[-0.06em] text-apricot md:text-7xl">
            <Counter to={s.n} decimals={s.d} delay={i * 0.12} />
            <span className="text-3xl md:text-4xl">{s.suffix}</span>
          </dd>
          <dd className="text-lg font-semibold">{s.label}</dd>
          <dd className="text-sm text-paper/55">{s.sub}</dd>
        </div>
      ))}
    </dl>
  )
}

function Counter({ to, decimals, delay }: { to: number; decimals: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.4, delay, ease: EASE_OUT, onUpdate: setV })
    return () => c.stop()
  }, [inView, to, delay])
  return <span ref={ref}>{v.toFixed(decimals).replace(".", ",")}</span>
}
