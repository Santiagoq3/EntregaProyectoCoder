const {Router, request} = require("express");
const Carrito = require("../models/Carrito");
const Producto = require("../models/Producto")
const pathCarrito = "./db/carritos.json"
const path = "./db/productos.json"

const carrito =  new Carrito(pathCarrito)
const producto = new Producto(path)
const router = Router();

router.post("/",async(req = request,res )=>{

    try {
        
        carrito.crearCarrito()

        res.status(200).json({
            msg: "carrito creado correctamente"
        })

    } catch (error) {

        console.log(error)
        res.json({
            msg: error
        })
    }
    
})

router.delete("/:id", async(req = request,res )=>{

    const {id} = req.params

    Number(id)

    if(!id){

        return res.json({
            msg: "el id es obligatorio"
        })
    }

    try {
        
       await carrito.deleteCarritoById(id)

        res.status(200).json({
            msg: "carrito eliminado correctamente"
        })

    } catch (error) {

        console.log(error)
        res.json({
            msg: error
        })
    }
    
})


router.post("/:id/productos/:id_prod",async(req = request,res )=>{

    let {id, id_prod} = req.params
    
    id = Number(id)
    id_prod = Number(id_prod)

    let [productoParaCarrito]  = await producto.getById(id_prod)
    try {
        
       const carritoPost = await carrito.crearProductosParaUnCarrito(id, productoParaCarrito)

        res.status(200).json({
            msg: "carrito obtenido",
            carritoPost
        })

    } catch (error) {

        console.log(error)
        res.json({
            msg: error
        })
    }
    
})



module.exports = router