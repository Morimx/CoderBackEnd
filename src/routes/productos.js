import express from 'express';
import { Router } from 'express';
import Contenedor from '../../constructor.js';

const router = Router();
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
    const { id } = req.params;
    res.send(constructor.getById(parseInt(id)));
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post("/", (req, res) => {
  try {
    const data = req.body;
    constructor.save(data);
    res.redirect("/");
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

export { router as productosRouter }

