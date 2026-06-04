const negocios = [];

// LISTAR
const listarNegocios = (req, res) => {
    res.status(200).json(negocios);
};

// CRIAR
const criarNegocio = (req, res) => {

    const {
        nome,
        categoria,
        promocao,
        evento,
        servico
    } = req.body;

    if (!nome || !categoria) {
        return res.status(400).json({
            mensagem: "Nome e categoria são obrigatórios."
        });
    }

    const novoNegocio = {
        id: Date.now(),
        nome,
        categoria,
        promocao,
        evento,
        servico
    };

    negocios.push(novoNegocio);

    res.status(201).json({
        mensagem: "Negócio cadastrado com sucesso!",
        negocio: novoNegocio
    });
};

// ATUALIZAR
const atualizarNegocio = (req, res) => {

    const id = Number(req.params.id);

    const negocio = negocios.find(
        item => item.id === id
    );

    if (!negocio) {
        return res.status(404).json({
            mensagem: "Negócio não encontrado."
        });
    }

    negocio.nome =
        req.body.nome || negocio.nome;

    negocio.categoria =
        req.body.categoria || negocio.categoria;

    negocio.promocao =
        req.body.promocao || negocio.promocao;

    negocio.evento =
        req.body.evento || negocio.evento;

    negocio.servico =
        req.body.servico || negocio.servico;

    res.status(200).json({
        mensagem: "Negócio atualizado com sucesso!",
        negocio
    });
};

// DELETAR
const deletarNegocio = (req, res) => {

    const id = Number(req.params.id);

    const indice = negocios.findIndex(
        item => item.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Negócio não encontrado."
        });
    }

    negocios.splice(indice, 1);

    res.status(200).json({
        mensagem: "Negócio removido com sucesso!"
    });
};

module.exports = {
    listarNegocios,
    criarNegocio,
    atualizarNegocio,
    deletarNegocio
};