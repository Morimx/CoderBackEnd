const numero = {};

function random(min, max) {
  return parseInt(Math.random() * max) + min;
}

for (let i = 0; i <= 10000; i++) {
  const alAzar = random(1, 20);
  if (!numero[alAzar]) {
    numero[alAzar] = 0;
  }
  numero[alAzar]++;
}

console.log(numero);
