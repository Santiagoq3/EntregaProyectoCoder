const fs = require("fs")

class Producto {

    constructor(nombreArchivo, productos = [], producto) {

        this.nombreArchivo = nombreArchivo;
        this.productos = productos;

    }

    async save(objeto) {

        const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");

        this.productos = JSON.parse(data);

        objeto.id = this.productos.length + 1
        this.productos.push(objeto)
        try {

            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos))

        } catch (error) {
         console.log("no se pudo guardar", error)
        }
    }
    async actualizar(id, ...resto) {

        const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
        this.productos = JSON.parse(data);
        
        const [{title,precio,stock,descripcion,codigo}] = resto

        this.productos =  this.productos.map(producto => {
            if( producto.id === id){
                
               producto = {
                   title,
                   precio,
                   descripcion,
                   stock,
                   codigo,
                   id
               }
            }

            return producto
         })

        try {

            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos))

        } catch (error) {
         console.log("no se pudo guardar", error)
        }
    }
    
    async getById(id) {
        try {

            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            const productos = JSON.parse(data);

            return productos.filter(producto => producto.id === id)

        } catch (error) {
            console.log(error)
        }
    }
    
    async getAll() {

        try {

            const data = await fs.promises.readFile(this.nombreArchivo, {encoding: "utf-8"});
            const productos = JSON.parse(data);

            return productos

        } catch (error) {
            console.log(error)
        }
    }
   async deleteById(id) {

        try {

            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");

            const productos = JSON.parse(data);

            this.productos = productos.filter(producto => producto.id !== id)
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos))

        } catch (error) {

            console.log("no se pudo eliminar", error)
        }
    }

   async deleteAll() {

        this.productos = [];
        
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos))
    }

}

module.exports = Producto