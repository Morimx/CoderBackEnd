class CRUDMemoria {
    constructor() {
        this.memoria = [];
    }

    create(memoria) {
        this.memoria.push(memoria);
    }

    read() {
        return this.memorias;
    }

    readById(id) {
        return this.memoria.find(memoria => memoria.id === id);
    }

    update(id, memoria) {
        const index = thi.memorias.findIndex(memoria => memoria.id === id);
        this.memorias[index] = memoria;
    }

    delete(id) {
        const index = this.memoria.findIndex(memoria => memoria.id === id);
        this.memorias.splice(index, 1);
    }
}