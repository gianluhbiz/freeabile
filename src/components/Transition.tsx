import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { createContext, useCallback, useContext, useRef, useState, type MouseEvent, type ReactNode } from "react"
import { useNavigate } from "react-router"
import { EASE_IN_OUT } from "../lib/motion"

type Curtain = { to: string; x: number; y: number; label: string; phase: "cover" | "reveal" }
type Go = (to: string, origin: { x: number; y: number }, label: string) => void

const TransitionCtx = createContext<Go>(() => {})

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [curtain, setCurtain] = useState<Curtain | null>(null)
  const busy = useRef(false)

  const go = useCallback<Go>(
    (to, { x, y }, label) => {
      if (busy.current) return
      if (reduce) {
        navigate(to)
        window.scrollTo(0, 0)
        return
      }
      busy.current = true
      setCurtain({ to, x, y, label, phase: "cover" })
    },
    [navigate, reduce],
  )

  const onCovered = () => {
    if (!curtain || curtain.phase !== "cover") return
    navigate(curtain.to)
    window.scrollTo({ top: 0, behavior: "instant" })
    setCurtain({ ...curtain, phase: "reveal" })
    // let the new route paint under the curtain, then unmount it: its exit slides it up
    setTimeout(() => setCurtain(null), 120)
  }

  const radius = typeof window !== "undefined" ? Math.hypot(window.innerWidth, window.innerHeight) : 2000

  return (
    <TransitionCtx.Provider value={go}>
      {children}
      <AnimatePresence onExitComplete={() => (busy.current = false)}>
        {curtain && (
          <motion.div
            key="curtain"
            aria-hidden
            className="fixed inset-0 z-[100] grid place-items-center bg-forest text-cream"
            initial={{ clipPath: `circle(0px at ${curtain.x}px ${curtain.y}px)` }}
            animate={{ clipPath: `circle(${radius}px at ${curtain.x}px ${curtain.y}px)` }}
            exit={{ y: "-100%", transition: { duration: 0.7, ease: EASE_IN_OUT } }}
            transition={{ duration: 0.75, ease: EASE_IN_OUT }}
            onAnimationComplete={onCovered}
          >
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
            >
              <img src="/img/logo.jpg" alt="" className="size-16 rounded-full ring-1 ring-cream/30" />
              <span className="font-accent text-6xl md:text-8xl">{curtain.label}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionCtx.Provider>
  )
}

export function useCurtain() {
  return useContext(TransitionCtx)
}

type TLinkProps = { to: string; label: string; className?: string; children: ReactNode; "aria-label"?: string }

export function TLink({ to, label, className, children, ...rest }: TLinkProps) {
  const go = useCurtain()
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    const r = e.currentTarget.getBoundingClientRect()
    // keyboard activation reports 0,0: start from the element centre instead
    const x = e.clientX || r.left + r.width / 2
    const y = e.clientY || r.top + r.height / 2
    go(to, { x, y }, label)
  }
  return (
    <a href={to} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  )
}
