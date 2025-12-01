import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
       type: String
      //  O trecho abaixo foi substituido pelo validadorGlobal
      // type: String, 
      // required: [true, "O nome do(a) autor(a) é obrigatório."]
    }, 
    nacionalidade: {
      type: String
    }
  },
  {
    versionKey: false
  }
)

const autores = mongoose.model("autores", autorSchema)

export default autores;