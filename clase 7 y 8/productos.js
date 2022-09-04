const express = require("express");
const { Router } = express;
const router = Router();
const Contenedor = require("../clase4/desafio-clase4");
const constructor = new Contenedor("./productos.txt");

router.get("/", (req, res) => {
  res.send(constructor.getAll());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(constructor.getById(parseInt(id)));
});

router.post("/", (req, res) => {
  const data = req.body;
  const ID = constructor.save(data);
  res.send({ ID });
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const prodNuevo = req.body;
    let prodAnterior = constructor.getById(parseInt(id));
    prodAnterior = prodNuevo;
    res.send(constructor.updateById(id, prodAnterior));
  } catch (err) {
    res.send("No se encuentra el id requerido" + " " + err);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(constructor.deleteById(parseInt(id)));
});

module.exports = router;
