//Libs
import express from 'express';
import handlebars from "express-handlebars";
const app = express();

// DB
import DBContainer from './dbConnection/contenedor.js';
import mysqlconnection from './dbConnection/db.js';
import sqliteConfig from './dbConnection/SQLite3.js';
sqliteConfig.connection.filename = "./DB/ecommerce.sqlite"
const DBMensajes = new DBContainer(sqliteConfig, 'messages');
const DBProductos = new DBContainer(mysqlconnection, 'products');

// Constructor de productos y router
import randomData from './faker.js';
import { productosRouter } from './src/routes/productos.js';

// Normalizador de mensajes
import Normalizr from './normalizr.js';

//Socket server
import { Server } from 'socket.io';
import { createServer } from 'http';
const httpServer = createServer(app);
const io = new Server(httpServer);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));




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
  socket.emit('randomProducts', randomData());
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
  res.render("root", {
    layout: "root",
    title: "Página principal",
    Precio: "Precio",
    addProd: "Añadir Producto",
    compras: await DBProductos.getAll(),
    noProd: "No hay productos",
    partialsPath: "./views/partials",
  });
});

app.get("/productos-test", async (req, res) => {
  res.render("productos-test", {
    layout: "productos-test",
    partialsPath: "./views/partials",
  }
  );
});




/////////////////////////
// EXPRESS ROUTER ///////
/////////////////////////

app.use("/productos", productosRouter);

/////////////////////////
// SERVER ON ////////////
/////////////////////////
httpServer.listen(3000, () => {
  console.log("Server ON");
});
