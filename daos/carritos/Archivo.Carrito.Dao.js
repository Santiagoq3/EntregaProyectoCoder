const ArchivoContenedor = require("../../contenedores/Archivo.Contenedor")


class ArchivoCarritoDao extends ArchivoContenedor{
    constructor(){
        super("carritos.json")
    }
}


module.exports = ArchivoCarritoDao