import NaoEncontrada from "../errors/NaoEncontrada.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import { autores, livros } from "../models/index.js";

class LivroController {

  // static async listarLivros(req, res){
  //   try{
  //       console.log("listarLivros! ");
  //       //No método find do mongoose, se é passado {} será retornado todos os registros, em vez disso, poderia ter sido feito um filtro
  //       const listaLivros = await livro.find({});
  //       res.status(200).json(listaLivros);
        
  static listarLivros = async (req, res, next) => {
    try {
      // const livrosResultado = await livros.find()
      // .populate("autor")
      // .exec();
      
      // Tratamento de paginação
      // let {limite = 10, pagina = 1} = req.query;

      // Tratamento de paginação e de ordenação
      // Por padrão implementados que o campo padrão de ordenacao será pelo _id e a ordem decrescente (-1)
      let {limite = 10, pagina = 1, campoOrdenacao = "_id", ordem = -1} = req.query;

      // É possível agrupar dois parametros em um ficando mais concisa a passagem de parâmetros na url
      // let {limite = 10, pagina = 1, ordenacao = "_id:-1"} = req.query;
      // const [campoOrdenacao, ordem] = ordenacao.split(":");
      
      limite = parseInt(limite);
      pagina = parseInt(pagina);
      ordem = parseInt(ordem);

      if ((limite > 0) && (pagina > 0)) {
        const livrosResultado = await livros.find()
        // .sort({ titulo: 1}) // Ordena pela propriedade titulo do livro e de forma ascendente
        .sort({[campoOrdenacao]: ordem }) // Extrai o conteudo da variável campoOrdenacao e ordena pelo valor passado na variável ordem
        .skip((pagina -1) * limite)
        .limit(limite)
        .populate("autor")
        .exec();
        
        res.status(200).json(livrosResultado);
      } else {
        next(new RequisicaoIncorreta());
      }

    } catch (erro) {
      next(erro);
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next(new NaoEncontrada("Id do Livro não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  }

  static cadastrarLivro = async (req, res, next) => {

    // const novoLivro = req.body;

    // try{
    //     // Primeiramente, é necessário buscar um autor, mas o mongo retornará um objeto com alguns campos do mongo
    //     const autorEncontrado = await autor.findById(novoLivro.autor);
    //     const livroCompleto = { ...novoLivro, autor: { 
    //         // o campo _doc possui apenas a info que desejamos para identificar o autor
    //         ...autorEncontrado._doc }};
    //         const livroCriado = await livro.create(livroCompleto);
    //     console.log("cadastrarLivros! ");
        
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();
      if (livroResultado !== null) {
        res.status(201).send(livroResultado.toJSON());
      } else {
        next(new NaoEncontrada("Id do Livro não localizado."));
      }

    } catch (erro) {
      next(erro)
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});
      if (livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrada("Id do Livro não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  }

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);
      if (livroResultado !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NaoEncontrada("Id do Livro não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  }

  // static listarLivroPorEditora = async (req, res, next) => {
  //   try {
  //     const editora = req.query.editora;

  //     const livrosResultado = await livros.find({"editora": editora});
  //     if (livrosResultado !== null) {
  //       res.status(200).send(livrosResultado);
  //     } else {
  //       next(new NaoEncontrada("Id do Livro não localizado."));
  //     }

  //   } catch (erro) {
  //     next(erro);
  //   }
  // }

  // Utilizando regex pela classe RegExp do JavaScript
  // static listarLivroPorFiltro = async (req, res, next) => {
  //   try {
  //   const {editora, titulo} = req.query;

  //   const regex = new RegExp(titulo, "i");

  //   const busca = {};
  //   if (editora) busca.editora = editora;

  //   // Regex para ampliar as possibilidades de busca.
  //   // /titulo/ -> similar a consulta em BDs como %titulo%
  //   // i -> Ignore case
  //   // if (titulo) busca.titulo = /titulo/i   ou /queijo/i, etc

  //   if (titulo) busca.titulo = regex; 
    

  //   console.log(`Param editora: ${busca.editora}, e param titulo: ${busca.titulo}`)
  //     const livrosResultado = await livros.find(
  //     busca
  //   );
  //     if (livrosResultado !== null) {
  //       res.status(200).send(livrosResultado);
  //     } else {
  //       next(new NaoEncontrada("Nenhum resultado retornado."));
  //     }

  //   } catch (erro) {
  //     next(erro);
  //   }
  // }

  // Utilizando RegEx pela funcionalidade do MongoDB
 static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);
      if (busca !== null) {
        const livrosResultado = await livros.
        find(busca)
        .populate("autor");
        if (livrosResultado !== null) {
          res.status(200).send(livrosResultado);
        } else {
          next(new NaoEncontrada("Nenhum livro encontrado."));
        } 
      } else {
          next(new NaoEncontrada("Nenhum autor encontrado."));
        }

    } catch (erro) {
      next(erro);
    }
  }
}
  async function processaBusca(parametros) {
        const {editora, titulo, minPaginas, maxPaginas, nomeAutor} =  parametros;

    let busca = {};
    if (editora) busca.editora = editora;

    // Regex para ampliar as possibilidades de busca. Similar a consulta em BDs como %titulo%
    // "i" -> Ignore case

    if (titulo) busca.titulo = {$regex: titulo, $options: "i"}; 
    // Exemplo de busca por faixa para o campo numeroPaginas

    if (minPaginas || maxPaginas) busca.numeroPaginas = {};

    if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
    if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;
    // {numeroPaginas: {
    // $gte: 500,
    // $lte: 1000
    //   }}

    if (nomeAutor) {
      // Utilizou-se o findOne mas deveria buscar pelo find com regex e para cada autoir buscar os livros.
      const autor = await autores.findOne({ nome: nomeAutor});

      if (autor !== null) {
        // É necessário passar o id do autor para a busca no livro!
        busca.autor = autor._id;
        console.log(`Param editora: ${busca.editora}, e param titulo: ${busca.titulo}, minPaginas ${minPaginas} e maxPaginas ${maxPaginas} e nomeAutor ${nomeAutor}`);
      } else {
        busca = null;
      }
    }

    return busca;
  }


export default LivroController