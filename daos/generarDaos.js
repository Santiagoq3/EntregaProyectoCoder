
let Productos;
let Carritos

switch (process.env.DATABASE) {
    case "mongodb":

        const ProductoDao = require("./productos/MongoDB.Producto.Dao")
        const CarritoDao = require("./carritos/MongoDB.Carrito.Dao")

        Productos = new ProductoDao();
        Carritos  = new CarritoDao();
        
        break;

    default:
        break;
}

module.exports = {Productos,Carritos}