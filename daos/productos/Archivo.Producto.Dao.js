const ArchivoContenedor = require("../../contenedores/Archivo.Contenedor")


class ArchivoProductoDao extends ArchivoContenedor{
    constructor(){
        super("productos.json")
    }
}


module.exports = ArchivoProductoDao