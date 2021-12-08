const {Router, request, response} = require("express");
const {verificarAdministrador} = require("../helpers/verificarAdministrador");
const Producto = require("../models/Producto");
const path = "./db/productos.json"

const producto = new Producto(path, [] );

const router = Router();

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

],async(req = request,res = response)=>{

    let title = req.body.title
    let precio = req.body.precio
    let thumbnail = req.body.thumbnail
    let stock = req.body.stock
    let descripcion = req.body.descripcion
    let codigo = req.body.codigo

    if(!title || !precio || !stock || !codigo){
        return res.status(400).json({
            msg: "el titulo, precio, stock y codigo son obligatorios"
        })
    }

    console.log(title)

    const data = {
        title,
        precio,
        timestamp: Date.now(),
        thumbnail,
        stock,
        descripcion,
        codigo
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

    let title = req.body.title
    let precio = req.body.precio
    let thumbnail = req.body.thumbnail
    let stock = req.body.stock
    let descripcion = req.body.descripcion
    let codigo = req.body.codigo

    
    const {...resto} = req.body

    if(!title || !precio || !stock || !codigo || !descripcion){
        return res.status(400).json({
            msg: "el titulo, precio, stock, descripcion y codigo son obligatorios"
        })
    }

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