const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const validarCampos = require('../middlewares/validar-campos');
const {esRolValido,emailExistente,idExistente} = require('../helpers/db-validators')


const {peticionGET,peticionPOST,peticionPUT,peticionDELETE,peticionPATCH} = require('../controllers/user.controllers')

// Peticion GET
router.get('/', peticionGET)

// Peticion POST
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 letras').isLength(6),
    check('correo', 'El correo no es valido').isEmail(),    // Validar que sea un correo valido
    check('correo').custom(emailExistente),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], peticionPOST)

// Petecion PUT
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(), // Valida que sea un ID valido de Mongoose
    check('id').custom(idExistente),
    check('rol').custom(esRolValido),
    validarCampos 
],peticionPUT) 

// Peticion Delete
router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(), // Valida que sea un ID valido de Mongoose
    check('id').custom(idExistente),
    validarCampos
],peticionDELETE)

// Peticion Patch
router.patch('/', peticionPATCH)


module.exports = router;