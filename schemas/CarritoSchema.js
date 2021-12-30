const {Schema} = require("mongoose");

const CarritoSchema = Schema({
    timestamp:{
         type : Date, default: Date.now 
    },
    productos:{
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Producto"
        }],
        default: []
       
    },

})


module.exports = CarritoSchema