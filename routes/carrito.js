const {Router, request} = require("express");

const router = Router();

const { Carritos } = require("../daos/generarDaos");

router.get("/:id", async (req,res)=>{
    
    const id = req.params.id;

    const carrito =  await Carritos.getByIDPopulateCart(id);

    if(!carrito){
        return res.status(400).json({
            error: "no se encontro el carrito"
        })
    }

    res.status(200).json({
         carrito
    })
})

// crear carrito
router.post("/",async(req = request,res )=>{

    try {
        
        const carritoId = await Carritos.insert( {
            timestamp: Date.now(),
            productos: []
        })

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

    if(!id){

        return res.json({
            msg: "el id es obligatorio"
        })
    }

    try {
        
       await Carritos.delete(id)

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
  
    try {
        
       const carritoPost = await Carritos.insertProductToCart(id,id_prod)

        res.status(200).json({
            carritoPost
        })

    } catch (error) {

        console.log(error)
        res.json({
            msg: error
        })
    }
    
})

//  obtener productos de carrito
router.get("/productos/:id_cart", async (req,res)=>{
    
    const id = req.params.id_cart;

    const productos =  await Carritos.getByIDPopulateCart(id);

    if(!productos){
        return res.status(400).json({
            error: "no se encontro el carrito"
        })
    }

    res.status(200).json({
        productos
    })
})

router.delete("/:id/productos/:id_prod",async(req = request,res )=>{

    let {id, id_prod} = req.params
    
    try {
        
        const result = await Carritos.deleteProductsFromCart(id, id_prod);
        res.status(200).json({
            msg: "producto eliminado",
        })

    } catch (error) {

        console.log(error)
        res.json({
            msg: error
        })
    }
    
})

module.exports = router