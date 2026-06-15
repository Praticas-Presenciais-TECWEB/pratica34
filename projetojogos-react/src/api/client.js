const url = 'http://localhost:3000/jogos';

async function criar(jogo) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(jogo),
            headers: { "content-type": "application/json" }
        });
        const dados = await response.json();
        return dados;
    } catch (error) {
        return { mensagem: `Erro: ${error.message}` };
    }
}

async function obter(jogo) {
    try {
        const response = await fetch(`${url}/${jogo.id}`);
        const dados = await response.json();
        return dados;
    } catch (error) {
        return { mensagem: `Erro: ${error.message}` };
    }
}

async function listar() {
    try {
        const response = await fetch(url);
        const dados = await response.json();
        return dados;
    } catch (error) {
        return { mensagem: `Erro: ${error.message}` };
    }
}

async function atualizar(jogo) {
    try {
        const response = await fetch(`${url}/${jogo.id}`, {
            method: 'PUT',
            body: JSON.stringify(jogo),
            headers: { "content-type": "application/json" }
        });
        const dados = await response.json();
        return dados;
    } catch (error) {
        return { mensagem: `Erro: ${error.message}` };
    }
}

async function remover(jogo) {
    try {
        const response = await fetch(`${url}/${jogo.id}`, {
            method: 'DELETE',
        });
        const dados = await response.json();
        return dados;
    } catch (error) {
        return { mensagem: `Erro: ${error.message}` };
    }
}

export { criar, obter, listar, atualizar, remover }