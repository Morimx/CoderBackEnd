const fs = require('fs');
const express = require("express");
const { Router } = express;
const router = Router();


class Usuarioreg {
    constructor(archivo) {
        this.archivo = archivo;
    }

    save(objeto) {
        const contenido = fs.readFileSync(this.archivo, "utf-8");
        const usuarios = JSON.parse(contenido);
        const isPresent = usuarios.find( (usuario) => usuario.email === objeto.email);
        if ( isPresent ) {
            alert("El usuario ya existe");
        } else {
          const id = usuarios.length + 1;
          const usuarioDataFinal = { 
            id,
            isLogged: false,
            ...objeto
          };
          usuarios.push(usuarioDataFinal);
          fs.writeFileSync(this.archivo, JSON.stringify(usuarios, null, 2));
          return id;
      } 
    }

    
};

router.post("/signup", (req, res) => {
  debugger;
    try {
      const data = req.body;
      usuario.save(data);
      res.redirect("/");
    } catch (err) {
      res.status(404).send(err);
    }
  });


module.exports = Usuarioreg;