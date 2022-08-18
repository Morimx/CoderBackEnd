const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  save(objeto) {
    const contenido = fs.readFileSync(this.archivo, "utf-8");
    const productos = JSON.parse(contenido);
    const id =
      productos.length > 0
        ? productos[productos.length - 1].id + 1
        : productos.length + 1;
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
}

const contenedor = new Contenedor("productos.txt");

const producto1 = {
  title: "Escuadra",
  price: 123.45,
};

contenedor.save(producto1);
console.log(contenedor.getById(3));
contenedor.deleteById(3);
console.log(contenedor.getAll());
// contenedor.deleteAll();
// contenedor.getAll();
