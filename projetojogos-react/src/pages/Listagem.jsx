import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { listar, remover } from '../api/client'

function Listagem() {
    const [jogos, setJogos] = useState([])

    const trataRemover = async (jogo) => {
        await remover(jogo)
        setJogos(jogos.filter(item => item.id !== jogo.id))
    }

    useEffect(() => {
        const disparar = async () => {
            const dados = await listar()
            setJogos(dados)
        }
        disparar()
    }, [])

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
                    <h1>Coleção <span id="count-badge">{jogos.length}</span></h1>

                    {jogos.length === 0 ? (
                        <aside id="empty-state">
                            <p>Nenhum game encontrado. Que tal cadastrar um?</p>
                            <Link to="/jogos/novo">+ Adicionar game</Link>
                        </aside>
                    ) : (
                        <ul id="game-grid">
                            {jogos.map(jogo => (
                                <li key={jogo.id}>
                                    <article>
                                        <h2>{jogo.title}</h2>
                                        <p>Gênero: <strong>{jogo.genre}</strong></p>
                                        <p>Plataforma: <strong>{jogo.platform}</strong></p>
                                        <p>Ano: <strong>{jogo.year}</strong></p>
                                        {jogo.developer && <p>Desenvolvedora: <strong>{jogo.developer}</strong></p>}
                                        {jogo.description && <p>{jogo.description}</p>}
                                        <p>Nota: <strong>{parseFloat(jogo.rating).toFixed(1)}/10</strong></p>
                                        <button onClick={() => trataRemover(jogo)}>Remover</button>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>

            <footer>
                <p>Game dos Amigos &copy; 2026</p>
            </footer>
        </>
    )
}

export default Listagem