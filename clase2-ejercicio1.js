let datos = [1, 2, 3, "hola", "adios", true, false];

const mostrarLista = (datos) => {
  if (datos.length === 0) {
    console.log("Lista vacia");
  } else {
    for (let i = 0; i < datos.length; i++) {
      console.log(datos[i]);
    }
  }
};

mostrarLista(datos);

const crearMultiplicador = (num) => {
  return function (numero) {
    return numero * num;
  };
};

const multiplicador = crearMultiplicador(2);
console.log(multiplicador(5));
