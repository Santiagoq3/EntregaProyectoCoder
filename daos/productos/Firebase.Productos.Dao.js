const  ContenedorFirebase  = require("../../contenedores/FirebaseDB.Contenedor");


class FirebaseProductosDao extends ContenedorFirebase{
    constructor(){
        super("Producto")
    }
}


module.exports = FirebaseProductosDao