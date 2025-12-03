import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
    try{
        // Tratamento de paginação e de ordenação
        // Por padrão implementados que o campo padrão de ordenacao será pelo _id e a ordem decrescente (-1)
        let {limite = 4, pagina = 1, campoOrdenacao = "_id", ordem = -1} = req.query;

        // É possível agrupar dois parametros em um ficando mais concisa a passagem de parâmetros na url
        // let {limite = 10, pagina = 1, ordenacao = "_id:-1"} = req.query;
        // let [campoOrdenacao, ordem] = ordenacao.split(":");
        
        limite = parseInt(limite);
        pagina = parseInt(pagina);
        ordem = parseInt(ordem);

        const resultado = req.resultado;

        if (limite > 0 && pagina > 0) {
            const resultadoPaginado = await resultado.find()
            // .sort({ titulo: 1}) // Ordena pela propriedade titulo do livro e de forma ascendente
            .sort({[campoOrdenacao]: ordem }) // Extrai o conteudo da variável campoOrdenacao e ordena pelo valor passado na variável ordem
            .skip((pagina - 1) * limite)
            .limit(limite)
            // Popular o schema autor só funciona para livros, então foi comentado para ser genérico suportando o model autor
            // .populate("autor")
            .exec();
            
            res.status(200).json(resultadoPaginado);
        } else {
            next(new RequisicaoIncorreta());
        }
    } catch (erro) {
        next(erro);       
    }
}

export default paginar;