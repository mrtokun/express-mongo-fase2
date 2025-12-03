import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
  .get("/livros", LivroController.listarLivros)
  // Método comentado para evoluir para busca por filtro genérico em vez de restrito a editora
  // .get("/livros/busca", LivroController.listarLivroPorEditora)
  .get("/livros/busca", LivroController.listarLivroPorFiltro)
  .get("/livros/:id", LivroController.listarLivroPorId)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivro)

  
export default router;   