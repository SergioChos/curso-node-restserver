//! Levantar un servidor 

const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();  
        this.port = process.env.PORT;
        this.userPath = '/api/usuarios';

        // Middleware
        this.middleware();

        //Rutas de app
        this.routes();
    }

    middleware(){
        // cors
        this.app.use(cors())

        // parceo y lectura del body 
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'))
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