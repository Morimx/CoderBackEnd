const registrarusuario = require('../../registrarusuario');
const usuario = new registrarusuario('./data/usuarios.txt');

const bkndLogin = async ( req, res ) => {
    try {
        const { query } = req;
        await usuario.get(query);
        res.json({
            status: 'ok'
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = bkndLogin;