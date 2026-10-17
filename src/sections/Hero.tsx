import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { useRef, type PointerEvent } from "react"
import { INFO, P, type Photo } from "../lib/data"
import { EASE_OUT, rand } from "../lib/motion"
import { StatusPill } from "../components/Nav"

const WORD = "freeabile".split("")

type Floater = Photo & { cls: string; r: number; out: [number, number]; depth: number; delay: number }

const FLOATERS: Floater[] = [
  { ...P.brunch, cls: "left-[3%] top-[14%] w-[30vw] md:w-[14vw] aspect-[4/5]", r: -7, out: [-30, -40], depth: 40, delay: 0.5 },
  { ...P.cocktail, cls: "right-[4%] top-[12%] w-[26vw] md:w-[12vw] aspect-square", r: 6, out: [30, -45], depth: 55, delay: 0.6 },
  { ...P.pizzoccheri, cls: "left-[9%] bottom-[9%] w-[34vw] md:w-[17vw] aspect-[5/4]", r: 4, out: [-35, 40], depth: 30, delay: 0.7 },
  { ...P.cannoliBerries, cls: "right-[7%] bottom-[8%] w-[28vw] md:w-[13vw] aspect-[3/4]", r: -5, out: [35, 45], depth: 45, delay: 0.8 },
  { ...P.aperitivo, cls: "hidden md:block left-[30%] top-[9%] w-[9vw] aspect-square", r: 9, out: [-10, -60], depth: 70, delay: 0.9 },
  { ...P.croissant, cls: "hidden md:block right-[28%] bottom-[7%] w-[10vw] aspect-[4/3]", r: -10, out: [10, 60], depth: 65, delay: 1 },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 18 })
  const sy = useSpring(my, { stiffness: 80, damping: 18 })
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return
    mx.set(e.clientX / window.innerWidth - 0.5)
    my.set(e.clientY / window.innerHeight - 0.5)
  }

  const clip = useTransform(p, [0.28, 0.82], ["inset(46% 44% 46% 44% round 999px)", "inset(0% 0% 0% 0% round 0px)"])
  const imgScale = useTransform(p, [0.28, 1], [1.5, 1])
  const imgOpacity = useTransform(p, [0.22, 0.3], [0, 1])
  const capOpacity = useTransform(p, [0.8, 0.95], [0, 1])
  const capY = useTransform(p, [0.8, 0.95], [40, 0])
  const introOpacity = useTransform(p, [0, 0.18], [1, 0])
  const introY = useTransform(p, [0, 0.18], [0, -30])

  return (
    <section ref={ref} onPointerMove={onMove} className="relative h-[260vh]" aria-label="Freeabile">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* floating photos */}
        {FLOATERS.map((f, i) => (
          <FloatingPhoto key={f.src} f={f} i={i} p={p} sx={sx} sy={sy} still={!!reduce} />
        ))}

        {/* wordmark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.p
            style={{ opacity: introOpacity, y: introY }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
            className="mb-2 font-mono text-[11px] tracking-[0.25em] text-forest/70 uppercase md:mb-0 md:text-xs"
          >
            {INFO.tagline} · Sondrio
          </motion.p>

          <h1 className="relative flex font-display text-[clamp(4.2rem,20vw,21rem)] leading-[0.8] font-extrabold tracking-[-0.06em] text-forest select-none">
            <span className="sr-only">Freeabile</span>
            {WORD.map((ch, i) => (
              <Letter key={i} ch={ch} i={i} p={p} still={!!reduce} />
            ))}
            {!reduce && Array.from({ length: 26 }, (_, i) => <Crumb key={i} i={i} p={p} />)}
          </h1>

          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="mt-6 flex max-w-xl flex-col items-center gap-5 text-center md:mt-8"
          >
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE_OUT }}
              className="text-balance text-lg leading-snug text-ink/80 md:text-2xl"
            >
              Si legge <em className="font-accent text-[1.02em] not-italic text-forest">free-abile</em>. Suona come{" "}
              <em className="font-accent text-[1.02em] not-italic text-crust">friabile</em>, la sfoglia che si sbriciola al primo morso.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-col items-center gap-3"
            >
              <StatusPill className="rounded-full bg-cream/80 px-3 py-1.5 text-forest ring-1 ring-forest/10" />
              <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-ink/50 uppercase">
                <i className="ri-arrow-down-line animate-bounce" aria-hidden /> Scorri e assaggia
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* reveal */}
        <motion.div style={{ clipPath: clip, opacity: imgOpacity }} className="absolute inset-0 z-10">
          <motion.img
            src={P.bakery.src}
            alt={P.bakery.alt}
            style={{ scale: imgScale }}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent" />
          <motion.div
            style={{ opacity: capOpacity, y: capY }}
            className="absolute inset-x-0 bottom-0 mx-auto flex max-w-6xl flex-col gap-4 px-5 pb-14 text-cream md:flex-row md:items-end md:justify-between md:px-8 md:pb-16"
          >
            <h2 className="text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.88] font-bold tracking-[-0.04em]">
              Il forno si accende
              <br />
              <span className="font-accent font-normal text-apricot">alle sette.</span>
            </h2>
            <p className="max-w-xs text-base text-cream/80 md:text-right">
              Colazione, pranzo, aperitivo e cena nel centro di Sondrio. Il bancone resta aperto fino alle 22.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Letter({ ch, i, p, still }: { ch: string; i: number; p: MotionValue<number>; still: boolean }) {
  const start = 0.03 + rand(i, 1) * 0.16
  const end = start + 0.42
  const y = useTransform(p, [start, end], ["0vh", `${55 + rand(i, 2) * 60}vh`])
  const x = useTransform(p, [start, end], ["0vw", `${(rand(i, 3) - 0.5) * 24}vw`])
  const rotate = useTransform(p, [start, end], [0, (rand(i, 4) - 0.5) * 150])
  const opacity = useTransform(p, [end - 0.12, end], [1, 0])

  return (
    <motion.span
      aria-hidden
      initial={{ y: "35%", opacity: 0, filter: "blur(10px)" }}
      animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: 0.15 + i * 0.05, ease: EASE_OUT }}
      className="inline-block"
    >
      <motion.span style={still ? undefined : { y, x, rotate, opacity }} className="inline-block origin-bottom will-change-transform">
        {ch}
      </motion.span>
    </motion.span>
  )
}

function Crumb({ i, p }: { i: number; p: MotionValue<number> }) {
  const start = 0.05 + rand(i, 5) * 0.2
  const end = start + 0.35
  const size = 5 + rand(i, 6) * 12
  const y = useTransform(p, [start, end], ["0vh", `${40 + rand(i, 7) * 70}vh`])
  const x = useTransform(p, [start, end], ["0vw", `${(rand(i, 8) - 0.5) * 30}vw`])
  const rotate = useTransform(p, [start, end], [0, rand(i, 9) * 360])
  const opacity = useTransform(p, [start, start + 0.03, end - 0.08, end], [0, 1, 1, 0])

  return (
    <motion.span
      aria-hidden
      style={{
        y,
        x,
        rotate,
        opacity,
        width: size,
        height: size * (0.6 + rand(i, 10) * 0.6),
        left: `${5 + rand(i, 11) * 90}%`,
        top: `${20 + rand(i, 12) * 60}%`,
      }}
      className={`absolute rounded-[40%] ${i % 3 === 0 ? "bg-crust" : i % 3 === 1 ? "bg-apricot" : "bg-[#e3c9a0]"}`}
    />
  )
}

type FloatProps = { f: Floater; i: number; p: MotionValue<number>; sx: MotionValue<number>; sy: MotionValue<number>; still: boolean }

function FloatingPhoto({ f, i, p, sx, sy, still }: FloatProps) {
  const outX = useTransform(p, [0, 0.4], [0, f.out[0]])
  const outY = useTransform(p, [0, 0.4], [0, f.out[1]])
  const x = useTransform([outX, sx], ([o, m]: number[]) => `calc(${o}vw + ${m * f.depth}px)`)
  const y = useTransform([outY, sy], ([o, m]: number[]) => `calc(${o}vh + ${m * f.depth}px)`)
  const rotate = useTransform(p, [0, 0.4], [f.r, f.r * 3])
  const opacity = useTransform(p, [0.2, 0.38], [1, 0])

  return (
    <motion.figure
      style={still ? { rotate: f.r } : { x, y, rotate, opacity }}
      className={`absolute z-0 ${f.cls}`}
    >
      <motion.img
        src={f.src}
        alt={f.alt}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, delay: f.delay, ease: EASE_OUT }}
        className="size-full rounded-2xl object-cover shadow-[0_24px_50px_-20px_rgb(19_36_28/0.45)]"
        style={{ objectPosition: f.pos ?? "50% 50%" }}
        draggable={false}
        data-i={i}
      />
    </motion.figure>
  )
}
