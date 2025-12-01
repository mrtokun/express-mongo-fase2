// import { NetworkResources } from "inspector/promises";
import NaoEncontrada from "../errors/NaoEncontrada.js";
import { autores } from "../models/index.js";

class AutorController {

  // static async listarAutores(req, res){}
  static listarAutores = async(req, res) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);
      
  } catch (erro) {
          res.status(500).json({ message: `Erro interno no servidor - ${erro.message}`});
  }
  }

  static listarAutorPorId = async (req, res, next) => {
    
      try {
        const id = req.params.id;
  
        const autorResultado = await autores.findById(id);

        if (autorResultado !== null) {
          res.status(200).send(autorResultado);
        } else {
          next(new NaoEncontrada("Id do Autor não localizado."));
        }
  
      } catch (erro) {
        next(erro);
      }
    }
  
  
    static cadastrarAutor = async (req, res, next) => {
      try {
        // const autor = await autor.create(req.body);
        let autor = new autores(req.body);
  
        const autorResultado = await autor.save();
  
        if (autorResultado !== null) {
          res.status(201).send(autorResultado.toJSON());
        } else {
          next(new NaoEncontrada("Id do Autor não localizado."));
        }

      } catch (erro) {
        next(erro);
      }
    }
  

    static atualizarAutor = async (req, res, next) => {
      try {
        const id = req.params.id;
  
        const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});
  
        if (autorResultado !== null) {
          res.status(200).send({message: "Autor atualizado com sucesso"});
        } else {
          next(new NaoEncontrada("Id do Autor não localizado."));
        }

      } catch (erro) {
        next(erro);
      }
    }
  
    static excluirAutor = async (req, res, next) => {
      try {
        const id = req.params.id;
  
        const autorResultado = await autores.findByIdAndDelete(id);
        if (autorResultado !== null) {
          res.status(200).send({message: "Autor removido com sucesso"});
        } else {
          next(new NaoEncontrada("Id do Autor não localizado."));
        }

      } catch (erro) {
        next(erro);
      }
    }
  

}

export default AutorController