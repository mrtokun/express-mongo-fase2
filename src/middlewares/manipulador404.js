import NaoEncontrada from "../errors/NaoEncontrada.js";

function manipulador404(req, res, next) {
    // const erro404 = new NaoEncontrada().enviarResposta(res);
    const erro404 = new NaoEncontrada();
    next(erro404);
}

export default manipulador404;