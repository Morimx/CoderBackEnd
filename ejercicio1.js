const nombre = "Claudio";
const apellido = "Fernandez";
let edad = 34;
const precio = "$99.90";
const series = ["The Walking Dead", "The Sopranos", "The Office"];
const peliculas = [
    {
        nombre: "avengers",
        anioEstreno: 2012
        protagonistas: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    },
    {
        titulo: "Spider-Man",
        anioEstreno: 2002
        protagonistas: ["Tobey Maguire", "Willem Dafoe"],
    },
    {
        titulo: "Seven",
        anioEstreno: 1995
        protagonistas: ["Brad Pitt", "Morgan Freeman"],
    },
];

console.log(nombre, apellido, edad, precio, series, peliculas);
edad = 35;
console.log(edad);
series.push("Breaking bad");
console.log(series);
