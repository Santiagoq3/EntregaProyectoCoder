const mongoose = require('mongoose'); 

class ProductoContenedor{

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async findOne(criterio){
        try {
            const producto = await this.coleccion.findOne(criterio)
            return producto
        } catch (error) {
            console.log(error)
        }
    }

   async getByID(id){
        try {
            const producto  = await this.coleccion.findOne({"_id":id})
            return producto
        } catch (error) {
            console.log(error)
        }
        
    }
   async getByIDPopulateCart(id){
        try {
            const producto  = await this.coleccion.findOne({"_id":id}).populate("productos")
            return producto
        } catch (error) {
            console.log(error)
        }
        
    }

    async getAll(){
        try {
            const productos = await this.coleccion.find()
            return productos;
        } catch (error) {
            console.log(error)
        }
    }

    async insert(data){
        try {
            await this.coleccion.create(data)
        } catch (error) {
            console.log(error)
        }
    }

    async insertProductToCart(id_cart,id_prod){
        try {
            const carrito  = await this.coleccion.updateOne({"_id":id_cart}, {$push: {productos: id_prod}})
           return carrito
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsFromCart(id){
        try {
            const productos = await this.coleccion.findOne({"_id":id})
            console.log(productos)
            return productos
        } catch (error) {
            console.log(error)
        }
    }

    async update(id,data){
        try {
            const producto = await this.coleccion.findByIdAndUpdate(id, data)
            return producto
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id){
        try {
           const producto = await this.coleccion.deleteOne({ '_id': id })
           return producto
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductsFromCart(id_cart,id_prod){
        try {
            const carrito  = await this.coleccion.updateOne({"_id":id_cart}, {$pull: {productos: id_prod}})
           return carrito
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = ProductoContenedor