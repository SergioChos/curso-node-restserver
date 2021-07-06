const {Router} = require('express');
const router = Router();

const {peticionGET,peticionPOST,peticionPUT,peticionDELETE,peticionPATCH} = require('../controllers/user.controllers')


// Peticion GET
router.get('/', peticionGET)

// Peticion POST
router.post('/', peticionPOST)

// Petecion PUT
router.put('/:id', peticionPUT)     // Se le asigna una variable para la peticion

// Peticion Delete
router.delete('/', peticionDELETE)

// Peticion Patch
router.patch('/', peticionPATCH)


module.exports = router;