const fs = require("fs")

class ArchivoContenedor {

    constructor(nombreArchivo) {
        this.nombreArchivo = `./db/${nombreArchivo}`

        this.carritos = JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"))
        this.productos = []
    }

    async findOne(criterio){
        try {
            const producto = await this.coleccion.where("codigo", "==", `${criterio}`)
            return producto.onSnapshot()
        } catch (error) {
            console.log(error)
        }
    }

    async getByIDPopulateCart(id){
         //obtenemos el carrito
         const [carrito] = await this.obtenerCarrito(id);
         console.log(carrito)
         // retornamos los productos del carrito
         return carrito.productos
        
    }

    async getByID(id) {
        try {

            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            const productos = JSON.parse(data);

            return productos.filter(producto => producto.id == id)

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

    async insertCart(data){
        try {
            const guardado = await this.coleccion.add(data);
            return { ...data, id: guardado.id }
        } catch (error) {
            console.log(error)
        }
    }

    async insert(objeto,codigoData= "") {

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

    async obtenerCarrito(id){

        try {

            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            const carritos = JSON.parse(data);

            const carritosFiltrados = carritos.filter(carrito => carrito.id == id)

            return carritosFiltrados

        } catch (error) {
            console.log(error)
        }
    }

    async insertProductToCart(id, id_prod){

      // recorremos todos los carritos para encontrar nuetro carrito y agregar el producto y actualizar la informacion
      let productoCarritoExiste;

      const productosExistentes  = await JSON.parse(fs.readFileSync("./db/productos.json", "utf-8"))
      const idsExistentes = productosExistentes.map(productosIds => productosIds.id);
      console.log(idsExistentes)
      if(!idsExistentes.includes(Number(id_prod))){
            return {
                msg: "el producto no existe"
            }
      }
    //  -----    ----
    // validanddo existencia del producto en el carrito
     const productoDeCarrito = await this.getByIDPopulateCart(id);
     const productosExistentesEnCarrito = productoDeCarrito.map(productosIds => productosIds.id);

     if(productosExistentesEnCarrito.includes(Number(id_prod))){

         return {
             msg: "el producto ya existe en el carrito"
         }
     }
      
      const [producto] = productosExistentes.filter(producto => producto.id == id_prod);
      console.log(this.carritos)
      this.carritos =  this.carritos.map(carritoMap => {

          if(carritoMap.id == id){
              
              
              if(carritoMap.productos){

                  carritoMap.productos.push(producto)
                  
              }else{
                  carritoMap.productos = []
                  carritoMap.productos.push(producto)
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

    async update(id,...resto) {
        console.log(resto)
        const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
        this.productos = JSON.parse(data);
        
        const [{title,precio,stock,descripcion,codigo}] = resto

        this.productos =  this.productos.map(producto => {
            if( producto.id == id){
                
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

    async delete(id) {
        try {

            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");

            const productos = JSON.parse(data);

            this.productos = productos.filter(producto => producto.id != id)
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos))

        } catch (error) {

            console.log("no se pudo eliminar", error)
        }
    }

    async deleteProductsFromCart(id_cart,id_prod){

        this.carritos =  this.carritos.map(carritoMap => {

            if(carritoMap.id == id_cart){

               carritoMap.productos = carritoMap.productos.filter(producto => producto.id != Number(id_prod))
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

module.exports = ArchivoContenedor