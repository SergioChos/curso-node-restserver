const encript = require('bcryptjs');    // Encriptar las contraseñas 
const {validationResult} = require('express-validator');
const Usuario = require('../models/usuario'); // Treae la instancia de los esquemas
//! Peticiones

// Solo busquedas
const peticionGET = async (req, res) => {
    const {limite = 5,desde = 0} = req.query;
    const estadoTrue = {estado:true};
    // Funsion que convierte un string a numero
    const esNumero = numero =>{
        return Number(numero)
    }

    
    if(esNumero) {
        const[total,usuarios] = await Promise.all([
            Usuario.countDocuments(estadoTrue), // Total de registro en base de datos
            Usuario.find(estadoTrue) // Mandar solo los que tienen estado de true
                .skip(esNumero(desde))
                .limit(esNumero(limite))
        ])
    
        res.json({
            total,
            usuarios  
        });
    } else {
        res.json({
            msg: `El limite tiene que ser un numero`,
            esNumero
        })
    }
}


// Actualizar datos
const peticionPUT = async (req, res) => {
    const id = req.params.id;
    const {password,google,correo,_id,...resto} = req.body; // Datos que no se actualizan

    //TODO: validar contra base de datos
    if(password){
        // Encriptar contraseña
        const salt = encript.genSaltSync() //! numero de vueltas de cifrado (por default don 10)
        resto.password = encript.hashSync(password,salt) 
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto)

    res.json(usuario);
}


// Mandar datos
const peticionPOST = async (req, res) => {

    const {nombre,correo,password,rol} = req.body; // Si mandamos un json extraemos su contenido y mostramos en pantalla
    const usuario = new Usuario({nombre,correo,password,rol});

    // Encriptar contraseña
    const salt = encript.genSaltSync() //! numero de vueltas de cifrado (por default don 10)
    usuario.password = encript.hashSync(password,salt) 
    
    // Grabar los datos en la base de datos
    await usuario.save(); 


    res.json({
        usuario
    })
}


// Eliminar datos
const peticionDELETE = async(req, res) => {
    const {id} = req.params;

    // Borrar datos de la base con el id de referencia
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})
    res.json({
        msg: 'Delete API - Controlador',
        usuario
    })
}

const peticionPATCH = (req, res) => {
    res.json({
        msg: 'Patch API - Controlador'
    })
}

//! Exportar modulos
module.exports ={
    peticionGET,
    peticionPUT,
    peticionPOST,
    peticionDELETE,
    peticionPATCH
}