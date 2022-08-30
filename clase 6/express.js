const express = require("express");
const fs = require("fs");
const Contenedor = require("../clase4/desafio-clase4");
const producto1 = {
  title: "Escuadra",
  price: 123.45,
};

const constructor = new Contenedor("./productos.txt");

constructor.save(producto1);

const app = express();

app.get("/productos", (req, res) => {
  res.send(constructor.getAll());
});

app.get("/productoRandom", (req, res) => {
  res.send(constructor.getRandom());
});

const server = app.listen(8080, () => {
  console.log("Server ON");
});
