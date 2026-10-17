import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { P, type Photo } from "../lib/data"
import { EASE_OUT } from "../lib/motion"
import { TLink } from "../components/Transition"

const RING = "COLAZIONE ✦ PRANZO ✦ PASTICCERIA ✦ APERITIVO ✦ SERATE ✦ CAFFÈ ✦ PIZZA ✦ "

const PEEK: Photo[] = [P.croissant, P.lasagna, P.fruitTarts, P.spritz]

export function MenuTeaser() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const plate = useTransform(scrollYProgress, [0, 1], [-50, 110])
  const ring = useTransform(scrollYProgress, [0, 1], [40, -80])

  return (
    <section ref={ref} className="relative overflow-hidden bg-paper px-5 py-24 md:px-8 md:py-36" aria-labelledby="menu-title">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-7">
          <p className="font-mono text-xs tracking-[0.25em] text-crust uppercase">Un menu, quindici ore</p>
          <h2 id="menu-title" className="text-[clamp(3rem,8vw,7rem)] leading-[0.86] font-bold tracking-[-0.045em] text-forest">
            Cosa c'è
            <br />
            <span className="font-accent font-normal text-crust">sul banco.</span>
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-ink/75">
            Caffetteria, pasticceria, il pranzo dello chef, l'aperitivo e le serate del giovedì. Prezzi chiari, piatti
            che cambiano con la stagione.
          </p>

          <ul className="flex gap-2" aria-hidden>
            {PEEK.map((ph, i) => (
              <motion.li
                key={ph.src}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 4 : -4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: EASE_OUT }}
                className="size-16 overflow-hidden rounded-xl ring-2 ring-paper md:size-20"
              >
                <img src={ph.src} alt="" className="size-full object-cover" style={{ objectPosition: ph.pos }} loading="lazy" />
              </motion.li>
            ))}
          </ul>

          <TLink
            to="/menu"
            label="Il menu"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-forest py-2 pr-2 pl-6 text-lg font-semibold text-cream transition-transform duration-150 active:scale-[0.97]"
          >
            Apri il menu
            <span className="grid size-11 place-items-center rounded-full bg-apricot text-forest transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:rotate-45">
              <i className="ri-arrow-right-up-line text-xl" aria-hidden />
            </span>
          </TLink>
        </div>

        <TLink to="/menu" label="Il menu" aria-label="Apri il menu" className="group relative mx-auto block aspect-square w-full max-w-[520px]">
          <motion.svg viewBox="0 0 400 400" style={{ rotate: ring }} className="absolute inset-0 size-full text-forest" aria-hidden>
            <defs>
              <path id="ring" d="M200,200 m-182,0 a182,182 0 1,1 364,0 a182,182 0 1,1 -364,0" />
            </defs>
            <text className="fill-current font-mono text-[15.5px] font-semibold tracking-[0.18em]">
              <textPath href="#ring" textLength={1140} lengthAdjust="spacing">
                {RING}
              </textPath>
            </text>
          </motion.svg>
          <div className="absolute inset-[13%] overflow-hidden rounded-full shadow-[0_40px_80px_-30px_rgb(19_36_28/0.6)] ring-8 ring-cream transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:scale-[1.03]">
            <motion.img src={P.brunch.src} alt={P.brunch.alt} style={{ rotate: plate }} className="size-full scale-110 object-cover" />
          </div>
          <span className="absolute right-[6%] bottom-[10%] grid size-24 place-items-center rounded-full bg-apricot text-center font-accent text-lg leading-none text-forest shadow-lg transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:-rotate-12 md:size-28 md:text-xl">
            menu
            <br />
            completo
            <br />
            16 €
          </span>
        </TLink>
      </div>
    </section>
  )
}
