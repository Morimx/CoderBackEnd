const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  save(objeto) {
    const contenido = fs.readFileSync(this.archivo, "utf-8");
    const productos = JSON.parse(contenido);
    const id = productos.length + 1;
    const producto = { id, ...objeto };
    productos.push(producto);
    fs.writeFileSync(this.archivo, JSON.stringify(productos, null, 2));
    return id;
  }

  getById(id) {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    const objeto = dataParseada.find((objeto) => objeto.id === id);
    return objeto;
  }

  getAll() {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    return dataParseada;
  }

  deleteById(id) {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    const dataFiltrada = dataParseada.filter((objeto) => objeto.id !== id);
    const dataString = JSON.stringify(dataFiltrada);
    fs.writeFileSync(this.archivo, dataString);
    return dataFiltrada;
  }

  deleteAll() {
    fs.writeFileSync(this.archivo, "[]");
    return "[]";
  }

  getRandom() {
    const data = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(data);
    let random = dataParseada[Math.floor(Math.random() * dataParseada.length)];
    return random;
  }

  updateById(id, objetoNuevo) {
    const data = fs.readFileSync(this.archivo, "utf-8");
    let dataParseada = JSON.parse(data);
    let productoViejo = dataParseada.find((objeto) => objeto.id === id);
    let mensaje = "Se reemplazo el producto";
    if (productoViejo === undefined) {
      throw { msg: "404 Not found" };
    }
    let productosFiltrados = dataParseada.filter((objeto) => objeto.id !== id);
    productoViejo = { id, ...objetoNuevo };
    productosFiltrados.push(productoViejo);
    fs.writeFileSync(this.archivo, JSON.stringify(productosFiltrados, null, 2));
    return mensaje;
  }

  saveInCarrito(id, objetoAdd) {
    const mensaje = "Se agrego el producto al carrito";
    const contenido = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(contenido);
    let carrito = dataParseada.find((objeto) => objeto.id == id);
    carrito.productos.push(objetoAdd);
    fs.writeFileSync(this.archivo, JSON.stringify(dataParseada, null, 2));
    return mensaje;
  }

  deleteProduct(id, idProducto) {
    const mensaje = "Se elimino el producto del carrito";
    const contenido = fs.readFileSync(this.archivo, "utf-8");
    const dataParseada = JSON.parse(contenido);
    let carrito = dataParseada.find((objeto) => objeto.id == id);
    let productos = carrito.productos.filter((objeto) => objeto.id != idProducto);
    carrito.productos = productos;
    fs.writeFileSync(this.archivo, JSON.stringify(dataParseada, null, 2));
    return mensaje;
  }

};

module.exports = Contenedor;
