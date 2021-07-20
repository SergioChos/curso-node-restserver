const {validationResult} = require('express-validator');

const validarCampos = (req, res,next) => {
    // Validar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){ // Si hay errores 
        return res.status(400).json(errores)
    }
    
    next();
}

module.exports = validarCampos;