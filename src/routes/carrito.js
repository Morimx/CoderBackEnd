const express = require("express");
const { Router } = express;
const router = Router();
const Contenedor = require("../../constructor");
const constructor = new Contenedor("./data/carrito.json");
const productosDB = new Contenedor("./data/productos.json");

router.post("/", (req, res) => {
    try {
        const data = {};
        res.status(200).send("Carrito creado con el id: " + 
        constructor.saveCarrito(data));
    } catch (err) {
        res.status(401).send(err);
    }
});

router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;
        constructor.deleteById(parseInt(id));
        res.send("Se elimino el carrito con el id: " + id);
    } catch (err) {
        res.status(401).send(err);
    }
});


router.get("/:id/productos", (req, res) => {
    try {
        const { id } = req.params;
        const data = constructor.getById(parseInt(id));
        res.send(data.productos);
    } catch (err) {
        res.status(401).send(err);
    }
});


router.post("/:id/productos", (req, res) => {
    try {
        const { id } = req.params;
        const producto = req.body;
        const productoAgr = productosDB.getById(parseInt(producto.id));
        constructor.saveInCarrito(id, productoAgr);
        res.send("Se agrego el producto con el id: " + producto.id);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete("/:id/productos/:idProducto", (req, res) => {
    try {
        const { id, idProducto } = req.params;
        constructor.deleteProduct(id, idProducto);
        res.send("Se elimino el producto con el id: " + idProducto);
    } catch (err) {
        res.status(401).send(err);
    }
});


module.exports = router;
