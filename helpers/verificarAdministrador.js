const { request, response } = require("express");
 
 const verificarAdministrador = (req =request,res=response, next) => {

    const administrador = req.adminRol

    if(!administrador){
        return res.status(403).json({
            error: "ruta no autorizada"
        })
    }

    next()
  
}

module.exports = {
    verificarAdministrador
}