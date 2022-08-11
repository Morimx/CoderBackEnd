const nombre = "Claudio";
const apellido = "Fernandez";
let edad = 34;
const precio = "$99.90";
const series = ["The Walking Dead", "The Sopranos", "The Office"];
const peliculas = [
  {
    titulo: "avengers",
    fecha: 2009,
    protagonistas: "robert downey jr",
  },
  {
    titulo: "Spider-man",
    fecha: 2021,
    protagonistas: "Tom Holland",
  },
  {
    titulo: "ejemplo",
    fecha: undefined,
    protagonistas: "ejemplo1",
  },
];

console.log(nombre, apellido, edad, precio, series, peliculas);
edad = 35;
console.log(edad);
series.push("Breaking bad");
console.log(series);
