const {Schema} = require("mongoose");

const ProductoSchema = Schema({
    title:{
        type: String,
        required: [true,"el nombre es obligatorio"],
        unique: true
    },
    precio:{
        type: Number,
        default: 0,
        required: [true, "el precio es obligatorio"]
    },
    descripcion: {
        type: String
    },
    codigo: {
        type: String,
        required: [true,"el codigo es requerido"],
        unique: true
    },
    thumbnail: {type: String},
    stock: {
        type: Number,
        default: 0
    },
    timestamp:{
         type : Date, default: Date.now 
    }
})


module.exports = ProductoSchema