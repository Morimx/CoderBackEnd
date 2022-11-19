import express from 'express';
import { Router } from 'express';
import isLoggedIn from '../../middlewares/log.js';
import daoMongo from '../daos/usuarios/daoMongo.js';
import bcrypt from 'bcrypt';
const daoUsuarios = new daoMongo();
const router = Router();
const app = express();
app.use(express.json());

const PassHashed = (pass) => {
    bcrypt.hash(pass, 10, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            return hash;
        }
    });
}


router.get('/login', isLoggedIn, (req, res) => {
    res.render('login', {
        layout: 'login',
        title: 'Login',
    })
})

router.post('/login', async (req, res) => {
    const { user, password } = req.body;
    const verificacion = await daoUsuarios.findUser(user, password)
    if (verificacion) {
        req.session.user = user;
        res.redirect('/')
    } else { res.send("Usuario o contraseña incorrect <a href=/login>Volver al login</a>") }
})



router.get('/register', (req, res) => {
    res.render('register', {
        layout: 'register',
        title: 'Register',
    })
})

router.post('/register', (req, res) => {
    const { user, password } = req.body;
    daoUsuarios.create({ user, password });
    req.session.user = user;
    res.redirect('/');
})

router.get('/logout', (req, res) => {
    const username = req.session.user
    req.session.destroy();
    res.render('logout', {
        layout: 'logout',
        title: 'logout',
        name: username,
    })
}
)

export { router as usersRouter }