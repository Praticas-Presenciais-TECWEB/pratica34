import { Routes, Route } from 'react-router'
import Inicio from './pages/Inicio'
import Formulario from './pages/Formulario'
import Listagem from './pages/Listagem'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/jogos" element={<Listagem />} />
      <Route path="/jogos/novo" element={<Formulario />} />
      <Route path="/jogos/editar/:id" element={<Formulario />} />
    </Routes>
  )
}

export default App