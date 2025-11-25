import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"

const conexao = await db();

conexao.on("error", console.log.bind(console, 'Erro de conexão'))
conexao.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
})

const app = express();
app.use(express.json())
routes(app);

export default app