const express = require("express");
const mongoose = require('mongoose')
const admin = require("firebase-admin");

const { mongodbConfig, firebaseConfig } = require('../db/dbConfig')
const cors = require("cors");
const { request, response } = require("express");

const  serviceAccount = firebaseConfig;

class Server{
    
    constructor(){

         this.app  = express();
         this.PORT = process.env.PORT;

         
         this.adminROL = true

         this.productosPath= "/api/productos"
         this.carritoPath= "/api/carrito"

         this.conectarBaseDeDatos()

         this.middlewares()

         this.routes()

         this.rutasNoImplementadas()

         
    }

    rutasNoImplementadas(){

        this.app.get("*", function(req = request,res = response){
            
            res.json({
                error: -2,
                descripcion: "ruta no implementada - metodo : get"
            })
        })
        this.app.post("*", function(req = request,res = response){
            
            res.json({
                error: -2,
                descripcion: "ruta no implementada -- metodo : post"
            })
        })
        this.app.put("*", function(req = request,res = response){
            
            res.json({
                error: -2,
                descripcion: "ruta no implementada - metodo : put"
            })
        })
        this.app.delete("*", function(req = request,res = response){
            
            res.json({
                error: -2,
                descripcion: "ruta no implementada - metodo : delete"
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

    async conectarBaseDeDatos(){

        switch (process.env.DATABASE) {
            case "mongodb":
                  try {
                    await mongoose.connect(mongodbConfig.connection,mongodbConfig.options)
                    console.log("Base de datos conectada a mongodb");
                  }catch (error) {
                    console.log(error);
                    throw new Error('error en la base de datos')
                  }
                break;
            case "firebase":
                  try {
                    
                    admin.initializeApp(
                        {
                        credential:admin.credential.cert(serviceAccount),
                        databaseURL:"https://ecommerce-coderhouse-6fc6b.firebaseio.com"
                    })
                    console.log("conectado a la base de datos firebase")

                  } catch (error) {
                      console.log(error)
                  }
                  
                break;
        
            default:
                console.log("conectadao a otra base de datos");
        }
        
 
        
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
