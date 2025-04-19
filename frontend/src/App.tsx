import { Routes, Route } from "react-router-dom"

import Home from "@/components/pages/Home"
import About from "@/components/pages/About"
import Login from "@/components/pages/Login"
import Register from "@/components/pages/Register"
import Profile from "@/components/pages/Profile"

// import del layout:
import Layout from "./components/layout/Layout"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  )
}