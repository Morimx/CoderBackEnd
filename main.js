const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const fs = require("fs");
const fsPromise = fs.promises;

const Contenedor = require("./constructor");
const constructor = new Contenedor("./data/productos.json");

const { Server: SocketServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const productosRouter = require("./src/routes/productos");
const RoutesAPI = require("./src/routes/RoutesAPI");
const carritoRouter = require("./src/routes/carrito");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));


//Array del chat
let mensajes = [{ email: "bienvenida@chat.com", msg: "Bienvenido al chat", date: "01/01/2021 00:00:00" }];

/////////////////////////
// SOCKET IO ////////////
/////////////////////////

io.on("connection", (socket) => {
  console.log("Se ha conectado un cliente");
  socket.emit('new-message', mensajes);
  socket.emit('new-product', constructor.getAll());
  socket.on('new-message', (data) => {
    mensajes.push(data);
    io.sockets.emit('new-message', mensajes);
    fs.writeFile('./data/mensajes.txt', JSON.stringify(mensajes), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
  socket.on('new-product', async (data) => {
    await constructor.save(data);
    const productos = await constructor.getAll();
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
    layoutsDir: __dirname + "/views",
    defaultLayout: "main",
  })
);

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("root", {
    layout: "root",
    title: "Página principal",
    Precio: "Precio",
    addProd: "Añadir Producto",
    compras: constructor.getAll().sort((a, b) => a.id - b.id),
    noProd: "No hay productos",
    partialsPath: __dirname + "/views/partials",
  });
});

app.use("/signup", (req, res) => {
  res.render("signup", {
    layout: "signup"
  });
});

app.use("/productosrerandom", (req, res) => {
  res.render("productosHTML", {
    layout: "productosHTML"
  });
});



app.use("/login", (req, res) => {
  res.render("login", {
    layout: "login"
  });
});

/////////////////////////
// EXPRESS ROUTER ///////
/////////////////////////

app.use('/api', RoutesAPI);
app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);


/////////////////////////
// SERVER ON ////////////
/////////////////////////
httpServer.listen(3000, () => {
  console.log("Server ON");
});
