import { Routes, Route } from "react-router-dom"
import Layout from "@/layout/Layout"
import Home from "@/pages/Home"
import About from "@/pages/About"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Profile from "@/pages/Profile"
import CreateBoletin from "@/pages/CreateBoletin"
import AdminPage from "@/pages/AdminPage"
import BoletinDetail from "@/pages/BoletinDetail";
import BoletinActivity from "@/pages/BoletinActivity";
import BoletinManagement from "@/pages/BoletinManagement";
import Dashboard from "@/pages/Dashboard";

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
        <Route path="/actividad_boletines" element={<BoletinActivity />} />
        <Route path="/gestion_boletines" element={<BoletinManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Layout>
  )
}
