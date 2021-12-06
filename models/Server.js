const express = require("express");
const cors = require("cors");
const { request, response } = require("express");


class Server{
    constructor(){
         this.app  = express();
         this.PORT = process.env.PORT;
         this.adminROL = true

         this.productosPath= "/api/productos"
         this.carritoPath= "/api/carrito"

         this.middlewares()

         this.routes()

         this.app.get("*", function(req = request,res = response){
            
            res.json({
                error: -2,
                descripcion: "ruta no implementada"
            })
        })
    }

    middlewares(){

        this.app.use(express.json())

        this.app.use(express.static("public"))

        this.app.use(cors())

        this.app.use((req,res,next) =>{
            
            req.adminRol = this.adminROL
            next()
        })

    }

    routes(){

        this.app.use(this.productosPath, require('../routes/productos'));
        this.app.use(this.carritoPath, require('../routes/carrito'));

        
    
    }

    listen(){

        this.app.listen(this.PORT, ()=>{
            console.log(`servidor conectado en el puerto ${this.PORT}`)
        })
        
    }
}

module.exports = Server
