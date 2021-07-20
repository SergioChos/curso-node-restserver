const mongoose = require('mongoose');

// Coneccion a base de datos
const dbConnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_DB,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('Base de datos online')
        
    } catch (error) {
        console.log(error);
        thow;new Error('Error a la hora de iniciar la base de datos');
    }

}


module.exports ={
    dbConnection
}