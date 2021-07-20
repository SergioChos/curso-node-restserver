const Role = require('../models/role');
const Usuario = require('../models/usuario');

// Valida Rol existe 
const esRolValido = async(rol ="") => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol: ${rol} no esta disponible`);
    }
}

// Valida si un email existe
const emailExistente = async correo => {
    // Verificar si el correo existente
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El email: ${correo} ya existe`);
    }
}

// Valida si un ID existe
const idExistente = async id => {
    // Verificar si el correo existente
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id: ${id} no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExistente,
    idExistente
};