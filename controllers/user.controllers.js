const peticionGET = (req, res) => {
    const query = req.query
    res.json({
        msg: 'Get API - Controlador',
        query
    })
}

// Obtener datos
const peticionPUT = (req, res) => {
    const id = req.params.id;   // nombre de variable de la ruta 
    parseInt(id)
    res.json({
        msg: 'Put API - Controlador',
        id
    })
}

const peticionPOST = (req, res) => {
    const {nombre,edad} = req.body; // Si mandamos un json extraemos su contenido y mostramos en pantalla
    res.json({
        msg: 'Post API - Controlador',
        nombre,
        edad
    })
}

const peticionDELETE = (req, res) => {
    res.json({
        msg: 'Delete API - Controlador'
    })
}

const peticionPATCH = (req, res) => {
    res.json({
        msg: 'Patch API - Controlador'
    })
}

module.exports ={
    peticionGET,
    peticionPUT,
    peticionPOST,
    peticionDELETE,
    peticionPATCH
}