const {Router, request} = require("express");
const Carrito = require("../models/Carrito");
const Producto = require("../models/Producto")
const pathCarrito = "./db/carritos.json"
const path = "./db/productos.json"

const carrito =  new Carrito(pathCarrito)
const producto = new Producto(path)
const router = Router();

const { Productos, Carritos } = require("../daos/generarDaos");


router.get("/:id", async (req,res)=>{
    

    // id = Number(id)
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
        
    //    const carritoId = await carrito.crearCarrito()
        // CODIGO NUEVO
        const carritoId = await Carritos.insert()

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

    // Number(id)

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
    
    // id = Number(id)
    // id_prod = Number(id_prod)

    // ----- Validando que el producto exista ----

    // const productosExistentes  = await producto.getAll()
    // const productosExistentes = await Productos.getAll();
    // const idsExistentes = productosExistentes.map(productosIds => productosIds._id);
    // if(!idsExistentes.includes(productos)){
    //     return res.status(400).json({
    //         msg: "el producto no existe"
    //     })
    // }
     // -----    ----
    // validanddo existencia del producto en el carrito
    //  const productoDeCarrito = await carrito.obtenerProductosDeCarrito(id);
    //  const productosExistentesEnCarrito = productoDeCarrito.map(productosIds => productosIds.id);

    //  if(productosExistentesEnCarrito.includes(id_prod)){

    //      return res.status(400).json({
    //          msg: "el producto ya existe en el carrito"
    //      })
    //  }

    // let [productoParaCarrito]  = await producto.getByID(id_prod)
    //    const carritoPost = await carrito.crearProductosParaUnCarrito(id, productoParaCarrito)
    // const producto = await Productos.getByID(id_prod)
    try {
        
       const carritoPost = await Carritos.insertProductToCart(id,id_prod)

    //    if(carritoPost){
    //        return res.json({
    //            msg: "el producto en el carrito ya existe"
    //        })
    //    }
        res.status(200).json({
            msg: "Producto agregado al carrito",
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
    
    // id = Number(id)
    const id = req.params.id_cart;

    const {productos} =  await Carritos.getByIDPopulateCart(id);

    if(!carrito){
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
    
    // id = Number(id)
    // id_prod = Number(id_prod)

    try {
        
        await Carritos.deleteProductsFromCart(id, id_prod)
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