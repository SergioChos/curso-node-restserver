require('dotenv').config()
const Server = require('./models/server');

// Instancia de mi clase server
const server = new Server();

// LLamamos el metodo de listen
server.listen();


 

 
