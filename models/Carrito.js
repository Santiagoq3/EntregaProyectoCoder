const fs = require("fs")

class Carrito{
    constructor(nombreArchivo,estadoInicial = []){
        this.nombreArchivo = nombreArchivo
        this.carritos = estadoInicial

        this.id;
        this.timestamp;
        this.productos = [];

    }

    async crearCarrito(carrito = {}) {

        const carritos = await fs.promises.readFile(this.nombreArchivo, "utf-8");

        this.carritos = JSON.parse(carritos);

        carrito.id = this.carritos.length + 1
        this.carritos.push(carrito)
        try {

            await  fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.carritos))

        } catch (error) {
         console.log("no se pudo guardar", error)
        }
    }

    async obtenerCarrito(id){

        try {

            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            const carritos = JSON.parse(data);

            const carritosFiltrados = carritos.filter(carrito => carrito.id === id)

            return carritosFiltrados

        } catch (error) {
            console.log(error)
        }
    }

    async  deleteCarritoById(id){

        try {
    
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            const carritos = JSON.parse(data);

            this.carritos  =  carritos.filter(carrito => carrito.id != id)
    
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.carritos))
    
        } catch (error) {
            console.log(error)
        }
    }

    async getAllProductsByCarritoId(){

    }

    async crearProductosParaUnCarrito(id, productoParaCarrito){
      const [carrito] =   await this.obtenerCarrito(id);
        this.productos.push(productoParaCarrito);
        carrito.productos = this.productos
        console.log(carrito)
    }
}


module.exports = Carrito