//! Peticiones | Manejo de datos del request y response

const encript = require('bcryptjs');    // Encriptar las contraseñas 
const {validationResult} = require('express-validator');
const Usuario = require('../models/usuario'); // Treae la instancia de los esquemas

//? Solo busquedas
const peticionGET = async (req, res) => {
    const {limite = 5,desde = 0} = req.query;   // Obtener los parametros de la url
    const estadoTrue = {estado:true};

    // Funsion que convierte un string a numero
    const esNumero = numero =>{
        return Number(numero)
    }

    // Validar que se ingrese solo numeros 
    if(esNumero) {
        const[total,usuarios] = await Promise.all([
            Usuario.countDocuments(estadoTrue), // Total de registro en base de datos
            Usuario.find(estadoTrue) // Mandar solo los que tienen estado de true
                .skip(esNumero(desde))
                .limit(esNumero(limite))
        ])
        // Respuesta
        res.status(200).json({
            msg: 'Peticion GET | API - Controlador',
            total,
            usuarios  
        });
    } else {
        // Respuesta
        res.json({
            msg: `El limite tiene que ser un numero`,
            esNumero
        })
    }
}


//? Actualizar datos
const peticionPUT = async (req, res) => {
    const id = req.params.id;
    const {password,google,correo,_id,...resto} = req.body; // Datos que no se actualizan

    //validar si un password existe en la base de datos
    if(password){
        // Encriptar contraseña
        const salt = encript.genSaltSync() //! numero de vueltas de cifrado (por default don 10)
        resto.password = encript.hashSync(password,salt) 
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto)

    // Respuesta
    res.estatus(200).json({
        msg: 'Peticion PUT | API - Controlador',
        usuario
    });
}


//? Mandar datos
const peticionPOST = async (req, res) => {
    const {nombre,correo,password,rol} = req.body; // Si mandamos un json extraemos su contenido y mostramos en pantalla
    const usuario = new Usuario({nombre,correo,password,rol});

    // Encriptar contraseña
    const salt = encript.genSaltSync() //! numero de vueltas de cifrado (por default don 10)
    usuario.password = encript.hashSync(password,salt) 
    
    // Grabar los datos en la base de datos
    await usuario.save(); 

    // Respuesta
    res.status(201).json({
        msg: 'Peticion POST | API - Controlador',
        usuario
    })
}


//? Eliminar datos
const peticionDELETE = async(req, res) => {
    const {id} = req.params;

    // Borrar datos de la base con el id de referencia
    //const usuario = await Usuario.findByIdAndDelete(id);

    // Cambiar el estado del id 
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

    // Respuesta
    res.estatus(200).json({
        msg: 'Peticion Delete | API - Controlador',
        usuario
    })
}

const peticionPATCH = (req, res) => {
    res.json({
        msg: 'Peticion PATCH | API - Controlador',
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