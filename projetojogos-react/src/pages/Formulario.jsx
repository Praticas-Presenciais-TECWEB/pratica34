import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { criar, atualizar, obter } from '../api/client'

function Formulario() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [platform, setPlatform] = useState('')
    const [year, setYear] = useState('')
    const [rating, setRating] = useState('')
    const [developer, setDeveloper] = useState('')
    const [description, setDescription] = useState('')
    const [erros, setErros] = useState({})
    const [toast, setToast] = useState(false)

    useEffect(() => {
        const disparar = async () => {
            const jogo = await obter({ id })
            setTitle(jogo.title)
            setGenre(jogo.genre)
            setPlatform(jogo.platform)
            setYear(jogo.year)
            setRating(jogo.rating)
            setDeveloper(jogo.developer || '')
            setDescription(jogo.description || '')
        }
        if (id) disparar()
    }, [id])

    const validar = () => {
        const novosErros = {}
        if (!title.trim()) novosErros.title = 'Informe o título do game.'
        if (!genre) novosErros.genre = 'Selecione um gênero.'
        if (!platform) novosErros.platform = 'Selecione uma plataforma.'
        const ano = parseInt(year)
        if (isNaN(ano) || ano < 1970 || ano > 2099) novosErros.year = 'Informe um ano válido (1970–2099).'
        const nota = parseFloat(rating)
        if (isNaN(nota) || nota < 0 || nota > 10) novosErros.rating = 'Informe uma nota entre 0 e 10.'
        setErros(novosErros)
        return Object.keys(novosErros).length === 0
    }

    const trataSalvar = async (e) => {
        e.preventDefault()
        if (!validar()) return

        const jogo = { title, genre, platform, year, rating, developer, description }

        if (id) {
            await atualizar({ id, ...jogo })
        } else {
            await criar(jogo)
            setToast(true)
            setTimeout(() => setToast(false), 3000)
            setTitle('')
            setGenre('')
            setPlatform('')
            setYear('')
            setRating('')
            setDeveloper('')
            setDescription('')
            setErros({})
        }

        navigate('/jogos')
    }

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
                <h1>{id ? 'Editar Game' : 'Cadastrar Game'}</h1>

                {toast && <p id="toast" style={{ display: 'block' }}>✔ Game cadastrado com sucesso!</p>}

                <section>
                    <form onSubmit={trataSalvar} noValidate>
                        <fieldset>
                            <legend>Informações do game</legend>

                            <p>
                                <label htmlFor="title">Título *</label>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="Ex: The Last of Us"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                {erros.title && <span>{erros.title}</span>}
                            </p>

                            <p>
                                <label htmlFor="genre">Gênero *</label>
                                <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
                                    <option value="">Selecione...</option>
                                    <option>Ação</option>
                                    <option>Aventura</option>
                                    <option>RPG</option>
                                    <option>FPS</option>
                                    <option>Estratégia</option>
                                    <option>Esporte</option>
                                    <option>Corrida</option>
                                    <option>Luta</option>
                                    <option>Terror</option>
                                    <option>Simulação</option>
                                    <option>Puzzle</option>
                                    <option>Outro</option>
                                </select>
                                {erros.genre && <span>{erros.genre}</span>}
                            </p>

                            <p>
                                <label htmlFor="platform">Plataforma *</label>
                                <select id="platform" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                                    <option value="">Selecione...</option>
                                    <option>PC</option>
                                    <option>PlayStation 5</option>
                                    <option>PlayStation 4</option>
                                    <option>Xbox Series X/S</option>
                                    <option>Xbox One</option>
                                    <option>Nintendo Switch</option>
                                    <option>Mobile</option>
                                    <option>Outro</option>
                                </select>
                                {erros.platform && <span>{erros.platform}</span>}
                            </p>

                            <p>
                                <label htmlFor="year">Ano de lançamento *</label>
                                <input
                                    type="number"
                                    id="year"
                                    placeholder="Ex: 2024"
                                    min="1970"
                                    max="2099"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                                {erros.year && <span>{erros.year}</span>}
                            </p>

                            <p>
                                <label htmlFor="rating">Nota (0–10) *</label>
                                <input
                                    type="number"
                                    id="rating"
                                    placeholder="Ex: 8.5"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                />
                                {erros.rating && <span>{erros.rating}</span>}
                            </p>

                            <p>
                                <label htmlFor="developer">Desenvolvedora</label>
                                <input
                                    type="text"
                                    id="developer"
                                    placeholder="Ex: Naughty Dog"
                                    value={developer}
                                    onChange={(e) => setDeveloper(e.target.value)}
                                />
                            </p>

                            <p>
                                <label htmlFor="description">Descrição / Comentário</label>
                                <textarea
                                    id="description"
                                    placeholder="O que você achou do jogo?"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </p>

                        </fieldset>

                        <p>
                            <button type="submit">{id ? 'Salvar alterações' : '+ Cadastrar game'}</button>
                            <Link to="/jogos">Cancelar</Link>
                        </p>

                    </form>
                </section>
            </main>

            <footer>
                <p>Game dos Amigos &copy; 2026</p>
            </footer>
        </>
    )
}

export default Formulario
