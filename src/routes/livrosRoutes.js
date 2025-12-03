import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  //  O método LivroController.listarLivros espera que alguém continue o processo quando chamou next() então o middleware paginar irá prosseguir no tratamento, para isso registramos aqui a funcao paginar.
  .get("/livros", LivroController.listarLivros, paginar)
  // Método comentado para evoluir para busca por filtro genérico em vez de restrito a editora
  // .get("/livros/busca", LivroController.listarLivroPorEditora)
  .get("/livros/busca", LivroController.listarLivroPorFiltro, paginar)
  .get("/livros/:id", LivroController.listarLivroPorId)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivro)

  
export default router;   