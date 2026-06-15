import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { listar } from '../api/client'

function Inicio() {
  const [jogos, setJogos] = useState([])

  useEffect(() => {
    const disparar = async () => {
      const dados = await listar()
      setJogos(dados)
    }
    disparar()
  }, [])

  const totalJogos = jogos.length

  const totalGeneros = new Set(jogos.map(j => j.genre)).size

  const notaMedia = jogos.length > 0
    ? (jogos.reduce((s, j) => s + parseFloat(j.rating), 0) / jogos.length).toFixed(1)
    : '—'

  const ultimoJogo = jogos.length > 0
    ? jogos[jogos.length - 1].title
    : '—'

  return (
    <>
      <header>
        <nav>
          <Link to="/">Game dos Amigos</Link>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/jogos/novo">Cadastro</Link></li>
            <li><Link to="/jogos">Listagem</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section>
          <h1>Organize seus games favoritos</h1>
          <p>Cadastre, avalie e gerencie sua coleção de jogos em um só lugar.</p>
          <p>
            <Link to="/jogos/novo">+ Adicionar game</Link>
            <Link to="/jogos">Ver coleção</Link>
          </p>
        </section>

        <section>
          <h2>Sua coleção</h2>
          <ul>
            <li>
              <strong>{totalJogos}</strong>
              <span>Games cadastrados</span>
            </li>
            <li>
              <strong>{totalGeneros}</strong>
              <span>Gêneros diferentes</span>
            </li>
            <li>
              <strong>{notaMedia}</strong>
              <span>Nota média</span>
            </li>
            <li>
              <strong>
                {ultimoJogo.length > 12 ? ultimoJogo.slice(0, 12) + '…' : ultimoJogo}
              </strong>
              <span>Último cadastrado</span>
            </li>
          </ul>
        </section>
      </main>

      <footer>
        <p>Game dos Amigos &copy; 2026</p>
      </footer>
    </>
  )
}

export default Inicio