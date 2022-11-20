//Libs
import express from 'express';
import handlebars from "express-handlebars";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import bcrypt from 'bcrypt';
import passport from 'passport';
import isLoggedIn from './middlewares/log.js';
import { Strategy as LocalStrategy } from 'passport-local';


const app = express();

// DB
import DBContainer from './dbConnection/contenedor.js';
import mysqlconnection from './dbConnection/db.js';
import sqliteConfig from './dbConnection/SQLite3.js';
import Users from './src/controller/usuariosController.js';
sqliteConfig.connection.filename = "./DB/ecommerce.sqlite"
const DBMensajes = new DBContainer(sqliteConfig, 'messages');
const DBProductos = new DBContainer(mysqlconnection, 'products');



// routers
import { productosRouter } from './src/routes/productos.js';
//import { usersRouter } from './src/routes/usuarios.js';

// Normalizador de mensajes
import Normalizr from './normalizr.js';

//Socket server
import { Server } from 'socket.io';
import { createServer } from 'http';
const httpServer = createServer(app);
const io = new Server(httpServer);

//middlewares


//Configuraciones
app.use(cookieParser('kfjcu3977qhh214mm8rq723'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));

//sesion de mongo
app.use(session({
  secret: 'm34km24m2k4',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/ecommerce',
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  })
}))

/////////////////////////
// SOCKET IO ////////////
/////////////////////////

io.on("connection", async (socket) => {
  console.log("Se ha conectado un cliente");
  //Mensajes
  //socket.emit('data-normalizada', await Normalizr());
  //back
  socket.emit('new-message', await Normalizr());
  socket.on('new-message', async (data) => {
    await DBMensajes.add(data);
    io.sockets.emit('new-message', await Normalizr());
  });

  //Productos
  socket.emit('new-product', await DBProductos.getAll());
  socket.on('new-product', async (data) => {
    await DBProductos.add(data);
    const productos = await DBProductos.getAll();
    io.sockets.emit('new-product', productos);
  });
});

/////////////////////////
// HANDLE BARS VIEWS/////
/////////////////////////
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    layoutsDir: "./views",
    defaultLayout: "main",
  })
);
app.set("views", "./views");
app.set("view engine", "hbs");


app.get("/", async (req, res) => {
  if (req.session.user) {
    res.render("root", {
      layout: "root",
      title: "Página principal",
      Precio: "Precio",
      addProd: "Añadir Producto",
      name: req.session.user,
      compras: await DBProductos.getAll(),
      noProd: "No hay productos",
      partialsPath: "./views/partials",
    })
  }
  else {
    res.redirect('/login')
  }
});

/////////////////////////
// EXPRESS ROUTER ///////
/////////////////////////

app.use("/productos", productosRouter);
//app.use("/", usersRouter);

/////////////////////////
// PASSPORT /////////////
/////////////////////////




passport.use(
  "signup",
  new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
    console.log(username, password);
    Users.findOne({ username }, (err, user) => {
      if (user) return done(null, false);

      Users.create(
        { username, password: PassHashed(password), email },
        (err, user) => {
          if (err) return done(err);
          return done(null, user);
        }
      );
    });
  })
);

passport.use(
  "login",
  new LocalStrategy({}, (username, password, done) => {
    Users.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!validatePass(password, user.password)) return done(null, false);
      return done(null, user);
    });
  })
);


const PassHashed = (pass) => {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10), null);
}

const validatePass = (pass, hashedPass) => {
  return bcrypt.compareSync(pass, hashedPass);
};

passport.serializeUser((userObj, done) => {
  done(null, userObj._id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, done);
});


app.use(passport.initialize());
app.use(passport.session());

const authMw = (req, res, next) => {
  req.isAuthenticated() ? next() : res.send({ error: false });
};

app.get('/login', isLoggedIn, (req, res) => {
  res.render('login', {
    layout: 'login',
    title: 'Login',
  })
})



app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  (req, res) => {
    const { username } = req.body;
    req.session.user = username;
    res.redirect("/");
  }
);

app.get("/faillogin", (req, res) => {
  res.send("Usuario o contraseña incorrectos <a href='/login'>Volver</a>");
});



app.get('/signup', (req, res) => {
  res.render('register', {
    layout: 'register',
    title: 'Register',
  })
})

app.post('/signup', passport.authenticate('signup', { failureRedirect: "/failregister" }), (req, res) => {
  console.log("registrado")
  res.redirect('/');
});

app.get("/failregister", (req, res) => {
  res.send("El usuario ya existe <a href='/signup'>Volver</a>");
});

app.get('/logout', (req, res) => {
  const username = req.session.user
  req.session.destroy();
  res.render('logout', {
    layout: 'logout',
    title: 'logout',
    name: username,
  })
}
)
/////////////////////////
// SERVER ON ////////////
/////////////////////////
httpServer.listen(3000, () => {
  console.log("Server ON");
});
