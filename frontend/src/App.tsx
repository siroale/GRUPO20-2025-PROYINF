import { Routes, Route } from "react-router-dom"

import Home  from "@/components/pages/Home"
import About from "@/components/pages/About"

// import del layout:
import Layout from "./components/layout/Layout"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"      element={<Home  />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  )
}
