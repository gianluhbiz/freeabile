import { Route, Routes } from "react-router"
import { TransitionProvider } from "./components/Transition"
import Home from "./pages/Home"
import MenuPage from "./pages/Menu"

export default function App() {
  return (
    <TransitionProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </TransitionProvider>
  )
}
