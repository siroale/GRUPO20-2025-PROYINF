import { Link } from "react-router-dom"
import { Button } from "ui/button"

export default function Navbar() {
  return (
    <nav className="bg-gray-100 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">KESSOFT</h1>
        <div className="space-x-4">
          <Link to="/"><Button variant="ghost">Home</Button></Link>
          <Link to="/about"><Button variant="ghost">About</Button></Link>
        </div>
      </div>
    </nav>
  )
}
