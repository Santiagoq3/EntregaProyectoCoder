const fs = require("fs")

class Carrito{

    constructor(nombreArchivo){

        this.nombreArchivo = nombreArchivo
        this.carritos = JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"))

        this.id;
        this.timestamp;
        this.productos = [];

    }

    async crearCarrito(carrito = {}) {

        carrito.id = this.carritos.length + 1
        carrito.timestamp = Date.now()
        this.carritos.push(carrito)
        try {

            await  fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.carritos))
            return carrito.id

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

    async obtenerProductosDeCarrito(id){
        //obtenemos el carrito
        const [carrito] = await this.obtenerCarrito(id);

        // retornamos los productos del carrito
        return carrito.productos
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

    async crearProductosParaUnCarrito(id, productoParaCarrito){

      // recorremos todos los carritos para encontrar nuetro carrito y agregar el producto y actualizar la informacion
        let productoCarritoExiste;
        this.carritos =  this.carritos.map(carritoMap => {

            if(carritoMap.id === id){
                
                
        
                if(carritoMap.productos){

                    carritoMap.productos.push(productoParaCarrito)
                    
                }else{
                    carritoMap.productos = []
                    carritoMap.productos.push(productoParaCarrito)
                }
            }

            return carritoMap
        })
        
        // actualizamos y guardamos nuestro carrito con los productos actualizados
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.carritos))
        } catch (error) {
            console.log(error)
        }

        return productoCarritoExiste

    }

    async eliminarProductoDeUnCarrito(id, id_prod){

        this.carritos =  this.carritos.map(carritoMap => {

            if(carritoMap.id === id){

               carritoMap.productos = carritoMap.productos.filter(producto => producto.id !== id_prod)
            }

            return carritoMap
        })

        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.carritos))
        } catch (error) {
            console.log(error)
        }

    }
}


module.exports = Carrito