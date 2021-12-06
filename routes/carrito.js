const {Router, request} = require("express");
const Carrito = require("../models/Carrito");
const Producto = require("../models/Producto")
const pathCarrito = "./db/carritos.json"
const path = "./db/productos.json"

const carrito =  new Carrito(pathCarrito)
const producto = new Producto(path)
const router = Router();

// crear carrito
router.post("/",async(req = request,res )=>{

    try {
        
       const carritoId = await carrito.crearCarrito()

        res.status(200).json({
            msg: "carrito creado correctamente",
            carritoId
        })

    } catch (error) {

        console.log(error)
        res.json({
            msg: error
        })
    }
    
})

// vaciar un carrito y eliminarlo
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

router.get("/:id/productos", async (req= request,res)=>{
    
    let {id} = req.params;
    id = Number(id)

    const productos =  await carrito.obtenerProductosDeCarrito(id);

    res.status(200).json({
         productos
    })
})

router.delete("/:id/productos/:id_prod",async(req = request,res )=>{

    let {id, id_prod} = req.params
    
    id = Number(id)
    id_prod = Number(id_prod)

    await carrito.eliminarProductoDeUnCarrito(id, id_prod)

    try {
        
        res.status(200).json({
            msg: "productos eliminados",
        })

    } catch (error) {

        console.log(error)
        res.json({
            msg: error
        })
    }
    
})





module.exports = router