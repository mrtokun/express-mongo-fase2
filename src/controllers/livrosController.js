import NaoEncontrada from "../errors/NaoEncontrada.js";
import { livros } from "../models/index.js";

class LivroController {

  // static async listarLivros(req, res){
  //   try{
  //       console.log("listarLivros! ");
  //       //No método find do mongoose, se é passado {} será retornado todos os registros, em vez disso, poderia ter sido feito um filtro
  //       const listaLivros = await livro.find({});
  //       res.status(200).json(listaLivros);
        
  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
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

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;

      const livrosResultado = await livros.find({"editora": editora});
      if (livrosResultado !== null) {
        res.status(200).send(livrosResultado);
      } else {
        next(new NaoEncontrada("Id do Livro não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  }



}

export default LivroController