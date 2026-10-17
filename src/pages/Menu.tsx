import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { useEffect, useRef, useState, type PointerEvent } from "react"
import { useLocation } from "react-router"
import { Nav, StatusPill } from "../components/Nav"
import { TLink } from "../components/Transition"
import { INFO, MENU, NIGHTS, P, type MenuCategory, type MenuItem, type Photo } from "../lib/data"
import { EASE_OUT } from "../lib/motion"

const TABS = [...MENU.map((c) => ({ id: c.id, title: c.title })), { id: "serate", title: "Serate" }]

export default function MenuPage() {
  const { hash } = useLocation()
  const [active, setActive] = useState(TABS[0].id)
  const [preview, setPreview] = useState<Photo | null>(null)

  // floating preview that trails the cursor while hovering a dish
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 260, damping: 26, mass: 0.6 })
  const y = useSpring(my, { stiffness: 260, damping: 26, mass: 0.6 })
  const onMove = (e: PointerEvent) => {
    mx.set(e.clientX)
    my.set(e.clientY)
  }

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 650)
  }, [hash])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    )
    TABS.forEach((t) => {
      const el = document.getElementById(t.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <div onPointerMove={onMove} className="min-h-svh bg-paper">
      <Nav />
      <MenuHero />

      <nav
        aria-label="Categorie del menu"
        className="sticky top-[4.6rem] z-40 mx-auto mt-6 flex w-fit max-w-[calc(100%-1.5rem)] gap-1 overflow-x-auto rounded-full border border-forest/10 bg-cream/85 p-1 backdrop-blur-xl [scrollbar-width:none]"
      >
        {TABS.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${active === t.id ? "text-cream" : "text-forest/70 hover:text-forest"}`}
          >
            {active === t.id && (
              <motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-forest" transition={{ type: "spring", duration: 0.45, bounce: 0.15 }} />
            )}
            <span className="relative">{t.title}</span>
          </a>
        ))}
      </nav>

      <main className="mx-auto max-w-6xl px-5 md:px-8">
        {MENU.map((c, i) => (
          <Category key={c.id} c={c} index={i} onHover={setPreview} />
        ))}
        <Nights />
      </main>

      <MenuFooter />

      {/* cursor preview, only on devices with a real pointer */}
      <motion.div style={{ x, y }} className="pointer-events-none fixed top-0 left-0 z-30 hidden [@media(hover:hover)]:block" aria-hidden>
        <AnimatePresence>
          {preview && (
            <motion.img
              key={preview.src}
              src={preview.src}
              alt=""
              initial={{ opacity: 0, scale: 0.85, rotate: -6, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, rotate: -3, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.92, filter: "blur(4px)", transition: { duration: 0.18 } }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="absolute top-0 left-0 ml-6 h-56 w-44 -translate-y-1/2 rounded-2xl object-cover shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)]"
              style={{ objectPosition: preview.pos ?? "50% 50%" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function MenuHero() {
  const title = "Il menu".split("")
  return (
    <header className="relative mx-auto max-w-6xl px-5 pt-32 md:px-8 md:pt-40">
      <div className="grid items-end gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT }}
            className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.2em] text-crust uppercase"
          >
            Freeabile · Sondrio
            <StatusPill className="rounded-full bg-cream px-3 py-1 text-forest ring-1 ring-forest/10" />
          </motion.p>
          <h1 className="mt-4 flex overflow-hidden pb-[0.08em] text-[clamp(4.5rem,15vw,13rem)] leading-[0.85] font-extrabold tracking-[-0.06em] text-forest" aria-label="Il menu">
            {title.map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.045, ease: EASE_OUT }}
                className={`inline-block ${ch === " " ? "w-[0.25em]" : ""} ${i > 2 ? "font-accent font-normal text-crust" : ""}`}
              >
                {ch}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE_OUT }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink/75"
          >
            Dalla brioche delle 7 al giro pizza del giovedì. Il pranzo cambia ogni giorno: chiedi al banco cosa ha scelto lo chef.
          </motion.p>
        </div>

        <motion.a
          href="#pranzo"
          initial={{ opacity: 0, y: 40, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE_OUT }}
          className="group relative block overflow-hidden rounded-3xl bg-night text-cream shadow-[0_30px_60px_-25px_rgb(19_36_28/0.6)] transition-transform duration-300 ease-[var(--ease-out-strong)] hover:rotate-0"
        >
          <img src={P.lasagna.src} alt={P.lasagna.alt} className="aspect-[5/4] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-105" style={{ objectPosition: P.lasagna.pos }} />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-apricot uppercase">Piatto scelto dallo chef</p>
              <p className="mt-1 text-2xl leading-tight font-bold tracking-tight">Lasagne al ragù d'anatra</p>
            </div>
            <span className="font-mono text-3xl font-semibold">12€</span>
          </div>
        </motion.a>
      </div>
    </header>
  )
}

function Category({ c, index, onHover }: { c: MenuCategory; index: number; onHover: (p: Photo | null) => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [90, -30])

  return (
    <section ref={ref} id={c.id} className="scroll-mt-32 border-t border-forest/15 py-16 md:py-24" aria-labelledby={`${c.id}-t`}>
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-40">
            <p className="font-mono text-sm text-crust">{String(index + 1).padStart(2, "0")} · {c.hours}</p>
            <h2 id={`${c.id}-t`} className="mt-3 text-[clamp(2.8rem,6vw,5rem)] leading-[0.88] font-bold tracking-[-0.045em] text-forest">
              {c.title}
              <br />
              <span className="font-accent font-normal text-crust">{c.accent}</span>
            </h2>
            <p className="mt-4 max-w-sm text-ink/70">{c.blurb}</p>
            <div className="relative mt-8 hidden h-72 md:block">
              <motion.img style={{ y: y1, rotate: -4 }} src={c.cover[0].src} alt={c.cover[0].alt} loading="lazy" className="absolute top-0 left-0 h-60 w-48 rounded-2xl object-cover shadow-xl" />
              <motion.img style={{ y: y2, rotate: 5 }} src={c.cover[1].src} alt={c.cover[1].alt} loading="lazy" className="absolute top-10 left-40 h-48 w-44 rounded-2xl object-cover shadow-xl" />
            </div>
          </div>
        </div>

        <ul className="md:col-span-7" onPointerLeave={() => onHover(null)}>
          {c.items.map((it, i) => (
            <Item key={it.name} it={it} i={i} onHover={onHover} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function Item({ it, i, onHover }: { it: MenuItem; i: number; onHover: (p: Photo | null) => void }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: i * 0.05, ease: EASE_OUT }}
      onPointerEnter={(e) => e.pointerType === "mouse" && onHover(it.img)}
      className="group flex items-center gap-4 border-b border-forest/10 py-5 md:py-6"
    >
      <img src={it.img.src} alt="" loading="lazy" className="size-14 shrink-0 rounded-xl object-cover md:hidden" style={{ objectPosition: it.img.pos }} />
      <div className="min-w-0 flex-1 transition-transform duration-300 ease-[var(--ease-out-strong)] md:group-hover:translate-x-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-xl font-semibold tracking-tight text-forest md:text-2xl">{it.name}</h3>
          {it.tag && (
            <span className="rounded-full bg-apricot/25 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-crust uppercase">{it.tag}</span>
          )}
        </div>
        {it.desc && <p className="mt-1 text-[15px] leading-snug text-ink/60">{it.desc}</p>}
      </div>
      <span className="hidden h-px flex-1 translate-y-2 border-b border-dotted border-forest/30 md:block md:max-w-24" aria-hidden />
      <span className="shrink-0 font-mono text-lg font-semibold text-forest md:text-xl">{it.price}€</span>
    </motion.li>
  )
}

function Nights() {
  return (
    <section id="serate" className="scroll-mt-32 border-t border-forest/15 py-16 md:py-24" aria-labelledby="serate-t">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-sm text-crust">{String(MENU.length + 1).padStart(2, "0")} · il giovedì sera</p>
          <h2 id="serate-t" className="mt-3 text-[clamp(2.8rem,6vw,5rem)] leading-[0.88] font-bold tracking-[-0.045em] text-forest">
            Serate <span className="font-accent font-normal text-crust">con musica dal vivo</span>
          </h2>
        </div>
        <p className="max-w-sm text-ink/70">
          Menu fisso, una band nel giardino. Il giovedì delle pizze: una pizza ti regala la bibita, quattro pizze ti regalano la quinta.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {NIGHTS.map((n, i) => (
          <motion.article
            key={n.title}
            initial={{ opacity: 0, y: 50, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: [-2, 1.5, -1][i] }}
            whileHover={{ rotate: 0, y: -8 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: EASE_OUT }}
            className="flex flex-col overflow-hidden rounded-3xl bg-night text-cream shadow-[0_30px_60px_-30px_rgb(19_36_28/0.7)]"
          >
            <img src={n.img.src} alt={n.img.alt} loading="lazy" className="aspect-square w-full object-cover object-top" />
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold tracking-tight">{n.title}</h3>
                <span className="font-mono text-2xl font-semibold text-apricot">{n.price}€</span>
              </div>
              <ul className="flex flex-col gap-1.5 text-sm text-cream/75">
                {n.lines.map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <i className="ri-checkbox-blank-circle-fill mt-1.5 text-[6px] text-apricot" aria-hidden />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function MenuFooter() {
  return (
    <footer className="mt-10 bg-forest px-5 py-20 text-paper md:px-8 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-[clamp(2.6rem,7vw,6rem)] leading-[0.88] font-bold tracking-[-0.045em]">
            Hai già fame?
            <br />
            <span className="font-accent font-normal text-apricot">Prenota un tavolo.</span>
          </h2>
          <p className="mt-5 max-w-md text-paper/60">
            Allergie o intolleranze? Dillo a chi ti serve: in cucina trovano sempre una soluzione.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href={INFO.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-apricot px-7 py-4 text-lg font-semibold text-forest transition-transform duration-150 active:scale-[0.97]"
          >
            <i className="ri-phone-line" aria-hidden /> {INFO.phone}
          </a>
          <TLink
            to="/#visita"
            label="Dove siamo"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/25 px-7 py-4 font-semibold transition-[background-color,transform] duration-200 hover:bg-paper/10 active:scale-[0.97]"
          >
            <i className="ri-map-pin-2-line" aria-hidden /> Come arrivare
          </TLink>
        </div>
      </div>
    </footer>
  )
}
