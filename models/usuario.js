// Objeto para guardar en la base de datos

const {Schema,model} = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required:[true ,'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required:[true ,'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required:[true ,'La contraseña es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required:true,
        emun:['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

//! Metodos
usuarioSchema.methods.toJSON = function(){
    const {__v,password,...usuario} = this.toObject();
    return usuario
}

//! Exportar
module.exports = model('Usuario', usuarioSchema);