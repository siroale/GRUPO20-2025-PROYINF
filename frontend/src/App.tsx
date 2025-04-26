import { Routes, Route } from "react-router-dom"

import Home from "@/components/pages/Home"
import About from "@/components/pages/About"
import Login from "@/components/pages/Login"
import Register from "@/components/pages/Register"
import Profile from "@/components/pages/Profile"
import CreateBoletin from "@/components/pages/CreateBoletin"
import AdminPage from "@/components/pages/AdminPage"

// import del layout:
import Layout from "./components/layout/Layout"
import BoletinDetail from "./components/pages/BoletinDetail";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boletin/:id" element={<BoletinDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/crear_boletin" element={<CreateBoletin />} />
        <Route path="/gestion_usuarios" element={<AdminPage />} />
      </Routes>
    </Layout>
  )
}
