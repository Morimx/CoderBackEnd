class Contador {
  static usosDeLaClase = 0;
  constructor(usuario) {
    this.usuario = usuario;
    this.valorinicial = 0;
    this.aumentarContador();
  }

  aumentarContador() {
    Contador.usosDeLaClase++;
  }

  obtenerResponsable() {
    return this.usuario;
  }

  obtenerCuentaIndividual() {
    return this.valorinicial;
  }

  obtenerCuentaGlobal() {
    return Contador.usosDeLaClase;
  }

  contar() {
    this.valorinicial++;
    this.aumentarContador();
    console.log(`${this.usuario} conto ${this.valorinicial} veces`);
    console.log(`La cuenta global es ${this.obtenerCuentaGlobal()}`);
  }
}

const contador1 = new Contador("Juan");
const contador2 = new Contador("Pedro");
const contador3 = new Contador("Maria");
console.log(contador1.obtenerResponsable());
console.log(contador1.obtenerCuentaIndividual());
console.log(contador1.obtenerCuentaGlobal());
console.log(contador2.contar());
