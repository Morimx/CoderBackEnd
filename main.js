const moment = require("moment");

const hoy = moment();
const nacimiento = moment("08/02/1997", "DD/MM/YYYY");
const difA = hoy.diff(nacimiento, "years");
const difB = hoy.diff(nacimiento, "days");

console.log(`Hoy es ${hoy.format("DD/MM/YYYY")}`);
console.log(`Desde mi nacimiento pasaron ${difA} años`);
console.log(`Desde mi nacimiento pasaron ${difB} dias`);
