const ProductoContenedor = require("../../contenedores/MongoDB.Producto.Contenedor")
const ProductoSchema = require("../../schemas/ProductoSchema")


class ProductoDao extends ProductoContenedor{

    constructor() {
        super('Producto', ProductoSchema)
    }
}




module.exports = ProductoDao