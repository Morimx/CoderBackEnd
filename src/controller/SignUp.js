const registrarusuario = require('../../registrarusuario');
const usuario = new registrarusuario('./data/usuarios.json');

const SignUp = async (req, res) => {
    try {
        const { query } = req;
        await usuario.save(query);
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

module.exports = SignUp;