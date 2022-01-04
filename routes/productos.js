const {Router, request, response} = require("express");
const { Productos } = require("../daos/generarDaos");
const {verificarAdministrador} = require("../helpers/verificarAdministrador");


const router = Router();

router.get("/", async(req,res)=>{

   const productos = await Productos.getAll()

     if(productos.length === 0){
         return res.status(400).json({
             error: "no hay productos existentes"
         })
     }

    res.status(200).json({
        
        productos
    })
})

router.get("/:id", async(req,res)=>{

    const id = req.params.id
   const productos = await Productos.getByID(id);

     if(!productos){
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


    const data = {
        title,
        precio,
        thumbnail,
        stock,
        descripcion,
        codigo
    }

    try {

       const result =  await Productos.insert(data, codigo)
        res.status(200).json({
           
            result
            
        })
    } catch (error) {
        console.log(error)
    }

})

router.put("/:id",[

    verificarAdministrador

] , async(req,res)=>{

    let id = req.params.id
    let title = req.body.title
    let precio = req.body.precio
    let thumbnail = req.body.thumbnail
    let stock = req.body.stock
    let descripcion = req.body.descripcion
    let codigo = req.body.codigo

    const {...resto} = req.body;
    const lengthOfObject = Object.keys(resto).length;
    if(lengthOfObject === 0){
        return res.status(400).json({
            msg: "error envie algun dato"
        })
    }

    if(!title || !precio || !stock || !codigo || !descripcion){
        return res.status(400).json({
            msg: "el titulo, precio, stock, descripcion y codigo son obligatorios"
        })
    }

     await Productos.update(id,resto)
    
    res.status(200).json({
        msg: "actualizado correctamente",
       
    })
    
})

router.delete("/:id",[

    verificarAdministrador

], async(req,res)=>{

    let id = req.params.id
    
    const producto =  await Productos.delete(id)

    res.status(200).json({
        msg: " producto eliminado correctamente",
        producto
    })
    
})

module.exports = router