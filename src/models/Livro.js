import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "O título do livro é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, ref: 'autores', 
      required: [true, "O autor do livro é obrigatório"]
    },
    editora: {
      type: String, 
      required: [true, "A editora é obrigatória!"],
      enum: {
        values: ["CPB", "Editora do mundo"],
        message: "O nome da editora {VALUE} não é um valor permitido."
      }
    },
    numeroPaginas: {
      type: Number,
      validate: (valor) => {
        return valor >= 10;
      },
      max: [1000, "O número de páginas {VALUE} deve estar entre 10 e 1000."]
    },
    numeroParagrafos: {
      type: Number,
      validate: (valor) => {
        return valor >= 10 && valor <= 1000;
      }
    },
    numeroTopicos: {
      type: Number,
      validate: {
        validator: (valor) => {
        return valor >= 2 && valor <= 50;
        },
        message: "O número de tópicos {VALUE} deve estar entre 2 e 50."
      }
    }
  }
);

const livros= mongoose.model('livros', livroSchema);

export default livros;