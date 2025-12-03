import ErroBase from "./ErroBase.js";

class NaoEncontrada extends ErroBase {
    constructor(message = "Página não encontrada!"){
        super(message, 204);
    }
}

export default NaoEncontrada
