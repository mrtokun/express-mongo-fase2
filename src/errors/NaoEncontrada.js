import ErroBase from "./ErroBase.js";

class NaoEncontrada extends ErroBase {
    constructor(message = "Página não encontrada!"){
        super(message, 404);
    }
}

export default NaoEncontrada
