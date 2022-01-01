

let Productos;
let Carritos

switch (process.env.DATABASE) {
    case "mongodb":

        const ProductoDao = require("./productos/MongoDB.Producto.Dao")
        const CarritoDao = require("./carritos/MongoDB.Carrito.Dao")

        Productos = new ProductoDao();
        Carritos  = new CarritoDao();
        
        break;
    case  "firebase":

        const FirebaseProductosDao = require("./productos/Firebase.Productos.Dao");
        const FirebaseCarritosDao = require("./carritos/Firebase.Carritos.Dao");

        Productos = new FirebaseProductosDao();
        Carritos  = new FirebaseCarritosDao();
        break;
    case "archivo":

        const ArchivoProductoDao = require("./productos/Archivo.Producto.Dao");
        const ArchivoCarritoDao = require("./carritos/Archivo.Carrito.Dao");

        Productos = new ArchivoProductoDao();
        Carritos= new ArchivoCarritoDao();
        break
    default:
        break;
}

module.exports = {Productos,Carritos}