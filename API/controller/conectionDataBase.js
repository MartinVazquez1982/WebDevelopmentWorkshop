const mongoose = require('mongoose');
var Schema = mongoose.Schema;

async function conectar(){
    //------------------------- URL

    // si no se define una variable de entorno con el string de conexión para mongo usa esta por default
    const url = process.env.STRING_URL_MONGO ? process.env.STRING_URL_MONGO : 'mongodb://webdevelopmentworkshop-mongodb-1:27017/'; 

    await mongoose.connect(url).then(() => {
        console.log('Conexión Exitosa')
    }).catch((error) => {
        console.error('Error al conectar a la base de datos:', error)
    });
}

module.exports = {conectar}