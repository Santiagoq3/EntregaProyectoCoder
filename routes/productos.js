const {Router, request} = require("express");
const {verificarAdministrador} = require("../helpers/verificarAdministrador");
const Producto = require("../models/Producto");
const path = "./db/productos.json"



const producto = new Producto(path, [] );

const router = Router();


// router.get("/", async(req,res)=>{

//     const productos = await contenedor.getAll()

//     res.status(200).json({
//         msg: "ok get productos",
//         productos
//     })
    
// })

router.get("/:id", async(req,res)=>{

    let id = req.params.id
    id = Number(id)
    
   const productos = await producto.getById(id)

     if(productos.length === 0){
         return res.status(400).json({
             error: "no se encontro el producto"
         })
     }

    res.status(200).json({
        msg: "ok get productos por id",
        productos
    })
})

router.post("/",[

    verificarAdministrador

],async(req = request,res)=>{

    let title = req.body.title
    let precio = req.body.precio
    let thumbnail = req.body.thumbnail

    console.log(title)

    const data = {
        title,
        precio,
        thumbnail,
    }
    await producto.save(data)


    res.status(200).json({
        msg: "Creado y guardado correctamente",
        
    })
    
})

router.put("/:id",[

    verificarAdministrador

] , async(req,res)=>{

    let id = req.params.id
    id = Number(id)

    const {...resto} = req.body
    
    await producto.actualizar(id,resto)


    res.status(200).json({
        msg: "actualizado correctamente",
       
    })
    
})

router.delete("/:id",[

    verificarAdministrador

], async(req,res)=>{

    let id = req.params.id
    id = Number(id)

     await producto.deleteById(id)

    res.status(200).json({
        msg: " producto eliminado correctamente"
    })
    
})

module.exports = router