import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [backendMessage, setBackendMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/api/saludo/')
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos del backend:', data);
        setBackendMessage(data.mensaje);
      })
      .catch(error => console.error('Error al conectar con el backend:', error));
  }, []);
  
  // Este useEffect se ejecutará cada vez que backendMessage cambie
  useEffect(() => {
    console.log('backendMessage actualizado:', backendMessage);
  }, [backendMessage]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        {backendMessage === '' ? 'Cargando mensaje del backend...' : `Django dice: ${backendMessage}`}
      </p>
    </>
  )
}

export default App