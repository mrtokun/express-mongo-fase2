import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await db();

conexao.on("error", console.log.bind(console, 'Erro de conexão'))
conexao.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
})

const app = express();
app.use(express.json())

// app.use((req, res) => {
//   res.status(200).send({ mensagem: "Resposta do novo middleware" });
// });

// Interceptador antes de  seguir (comando next()) para qualquer rota invocada.
app.use((req, res, next) => {
  console.log("Invocado um controller. ID: " );
  next();
});


// Interceptador apenas para a rota /livros
app.get("/livros", (req, res, next) => {
  console.log("Middleware registrado no GET da rota /livros");
  next();
});

routes(app);



 
app.use(manipulador404);
app.use(manipuladorDeErros);
export default app