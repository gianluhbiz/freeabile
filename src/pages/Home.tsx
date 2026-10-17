import { useEffect } from "react"
import { useLocation } from "react-router"
import { Nav } from "../components/Nav"
import { Dictionary } from "../sections/Dictionary"
import { Hero } from "../sections/Hero"
import { MenuTeaser } from "../sections/MenuTeaser"
import { Story } from "../sections/Story"
import { Visit } from "../sections/Visit"

export default function Home() {
  const { hash } = useLocation()

  // arriving from /menu with a hash: jump to the section once mounted
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "instant" }))
  }, [hash])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Dictionary />
        <MenuTeaser />
        <Visit />
      </main>
    </>
  )
}
