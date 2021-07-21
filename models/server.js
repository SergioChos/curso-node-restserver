//! Levantar un servidor 

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.bd')

class Server {
    constructor(){
        this.app = express();  
        this.port = process.env.PORT;
        this.userPath = '/api/usuarios';

        // Conectar base de datos 
        this.conectarBD();

        // Middleware
        this.middleware();

        //Rutas de app
        this.routes();
    }

    // Importar la base de datos
    async conectarBD(){
        await dbConnection();
    }

    middleware(){
        // cors
        this.app.use(cors())

        // parceo y lectura del body 
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public')) // Muestra la pagina de inicio de la app
    }

    routes(){
        this.app.use(this.userPath, require('../routes/user.routes'))
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Puerto: ${this.port}`)
        });
    }


}

module.exports = Server;