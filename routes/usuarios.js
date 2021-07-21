//! Rutas de peticiones

const {Router} = require('express');
const {peticionGet} = require('../controllers/usuarios');
const router = Router();

router.get('/', peticionGet);

router.put('/', (req, res) => {
    res.json({
        'msg': 'put API'
    });
});

router.post('/', (req, res) => {
    res.json({
        'msg': 'post API'
    });
});

router.delete('/', (req, res) => {
    res.json({
        'msg': 'delete API'
    });
});

router.patch('/', (req, res) => {
    res.json({
        'msg': 'patch API'
    });
});


module.export = router;