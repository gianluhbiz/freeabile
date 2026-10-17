import { motion } from "framer-motion"
import { useLocation } from "react-router"
import { useOpenStatus } from "../lib/useOpenStatus"
import { EASE_OUT } from "../lib/motion"
import { TLink } from "./Transition"

export function StatusPill({ className = "" }: { className?: string }) {
  const { open, label } = useOpenStatus()
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider ${className}`}>
      <span className="relative flex size-2">
        {open && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/70" />}
        <span className={`relative size-2 rounded-full ${open ? "bg-emerald-500" : "bg-crust"}`} />
      </span>
      {label}
    </span>
  )
}

export function Nav() {
  const onMenu = useLocation().pathname.startsWith("/menu")
  const link = "rounded-full px-3 py-2 transition-colors duration-200 hover:bg-forest/8"

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-3"
    >
      <nav className="flex w-full max-w-6xl items-center justify-between gap-2 rounded-full border border-forest/10 bg-cream/75 py-1.5 pr-1.5 pl-2 text-forest shadow-[0_8px_30px_-12px_rgb(19_36_28/0.35)] backdrop-blur-xl">
        <TLink to="/" label="Freeabile" className="flex items-center gap-2.5 rounded-full pr-2" aria-label="Freeabile, torna alla home">
          <img src="/img/logo.jpg" alt="" className="size-9 rounded-full" />
          <span className="text-lg font-bold tracking-tight">freeabile</span>
        </TLink>

        <div className="hidden items-center text-sm font-medium md:flex">
          {onMenu ? (
            <>
              <TLink to="/#storia" label="Chi siamo" className={link}>Chi siamo</TLink>
              <TLink to="/#visita" label="Dove siamo" className={link}>Dove siamo</TLink>
            </>
          ) : (
            <>
              <a href="#storia" className={link}>Chi siamo</a>
              <a href="#visita" className={link}>Dove siamo</a>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden lg:block">
            <StatusPill />
          </span>
          {onMenu ? (
            <a
              href="tel:+393755320408"
              className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-cream transition-transform duration-150 active:scale-[0.97]"
            >
              <i className="ri-phone-line" aria-hidden /> Prenota
            </a>
          ) : (
            <TLink
              to="/menu"
              label="Il menu"
              className="group inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-cream transition-transform duration-150 active:scale-[0.97]"
            >
              Il menu
              <i className="ri-arrow-right-up-line transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </TLink>
          )}
        </div>
      </nav>
    </motion.header>
  )
}
