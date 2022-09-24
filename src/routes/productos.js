const express = require("express");
const { Router } = express;
const Usuarioreg = require("../../registrarusuario");
const usuario = new Usuarioreg("./data/usuarios.txt");
const router = Router();
const Contenedor = require("../../constructor");
const constructor = new Contenedor("./data/productos.txt");

router.get("/", (req, res) => {
  try {
    res.send(constructor.getAll());
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/:id", (req, res) => {
  try {
    if (usuario.get(req.headers).administrador) {
    const { id } = req.params;
    res.send(constructor.getById(parseInt(id)));}
    else{
      res.status(401).send("No autorizado");
    }
  }
  catch (err) {
    res.status(404).send(err);
  }
});

router.post("/", (req, res) => {
  try {
    if (usuario.get(req.headers).administrador){
    const data = req.body;
    constructor.save(data);
    res.status(200).send("Producto agregado");
  } else{
    res.status(401).send("No autorizado");
  }
  } catch (err) {
    res.status(404).send(err);
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const prodNuevo = req.body;
    const idInt = parseInt(id);
    res.send(constructor.updateById(idInt, prodNuevo));
  } catch (err) {
    res.status(404).send(err.msg);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    res.send(constructor.deleteById(parseInt(id)));
  } catch (err) {
    res.status(404).send(err.msg);
  }
});

module.exports = router;
