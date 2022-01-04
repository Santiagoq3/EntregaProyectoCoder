const  admin = require("firebase-admin");
const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
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
        try {
            const producto  = await this.coleccion.doc(id).get();
            return producto.data()
        } catch (error) {
            console.log(error)
        }
        
    }

    async getByID(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            const data = doc.data()
            return {id, ...data}
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            const result = []
            const snapshot = await this.coleccion.get();
            snapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
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

    async insert(data,codigoData= "") {
        let codigos = [] ;
        try {
            
            const queryProductosCodigo  = await db.collection("Producto").where("codigo", "==",codigoData).get()
            queryProductosCodigo.forEach((doc) => {
                const {codigo} = doc.data();
                
                codigos.push(codigo)
          
              });

              if(codigos.includes(codigoData)){
                  return{
                      msg:"el producto con ese codigo ya existe"
                  }
              }else{

                const guardado = await this.coleccion.add(data);
                return { ...data, id: guardado.id }

              }
              
        } catch (error) {
            console.log(error)
        }
    }

    async insertProductToCart(id, id_prod){
        try {

            const queryProducto = await db.collection("Producto").doc(id_prod).get()
            const producto = queryProducto.data()
            producto.id = id_prod
            const doc = await this.coleccion.doc(id).get();
            const {productos} = doc.data();

            const idsExistentes = productos.map(productosIds => productosIds.id);
            if(idsExistentes.includes(id_prod)){
                return {
                    msg: "el producto ya existe en el carrito"
                }
            }


            productos.push(producto)
            const data = {
                productos
            }
            const actualizado = await this.coleccion.doc(id).update(data);
            return {
                msg: "producto agregado al carrito"
            }
        } catch (error) {
            console.log(error)
        }
    }

    async update(id,data) {
        try {
            const actualizado = await this.coleccion.doc(id).update(data);
            return actualizado
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id) {
        try {
            const doc = await this.coleccion.doc(id).delete();
            return doc
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductsFromCart(id_cart,id_prod){
        try {
            const querycart  = await this.coleccion.doc(id_cart).get();
            let {productos} = querycart.data()
            productos = productos.filter(producto=> producto.id != id_prod);

            const data  = {
                productos
            }
            const actualizado = await this.coleccion.doc(id_cart).update(data);
            return actualizado
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = ContenedorFirebase