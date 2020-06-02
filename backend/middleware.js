function saudacao (nome) {
    return function (req, res, next) {
    console.log(`Seja Bem vindo ${nome}.`)
    next()
    }
}

module.exports = saudacao