const ProductoContenedor = require("../../contenedores/MongoDB.Producto.Contenedor")
const CarritoSchema = require("../../schemas/CarritoSchema")

class CarritoDao extends ProductoContenedor{

    constructor() {
        super('Carrito', CarritoSchema)
    }
}




module.exports = CarritoDao