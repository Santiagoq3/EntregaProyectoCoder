const  ContenedorFirebase  = require("../../contenedores/FirebaseDB.Contenedor");


class FirebaseCarritosDao extends ContenedorFirebase{
    constructor(){
        super("Carrito")
    }
}


module.exports = FirebaseCarritosDao