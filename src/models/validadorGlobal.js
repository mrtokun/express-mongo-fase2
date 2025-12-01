import mongoose from "mongoose";

// É definido a propriedade de validação default para os models (Livro e Autor) para os campos do tipo string.
// É o mesmo formato utilizado com a propriedade de Livro.numeroTopicos
mongoose.Schema.Types.String.set("validate", {
    validator: (valor) => valor.trim() !== "",
    message: ({ path }) => `O campo ${path} não pode ser vazio.`
});