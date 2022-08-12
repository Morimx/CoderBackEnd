class Usuario {
  constructor(nombre, apellido, tituloLibro, autorDelLibro, nombreMascota) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [{ titulo: tituloLibro, autor: autorDelLibro }];
    this.mascotas = [nombreMascota];
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(nombre, autor) {
    this.libros.push({ titulo: nombre, autor: autor });
  }

  getBookNames() {
    return this.libros.map((book) => book.titulo);
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
}

let persona1 = new Usuario(
  "Juan",
  "Perez",
  "El señor de los anillos",
  "J. R. R. Tolkien",
  "Pipi"
);

console.log(persona1.getFullName());
persona1.addMascota("ChowChow");
console.log(persona1.countMascotas());
console.log(persona1.mascotas);
persona1.addBook("Harry Potter", "Jk Rowin");
console.log(persona1.getBookNames());
console.log(persona1.getFullName());
