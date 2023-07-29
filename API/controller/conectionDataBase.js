const mongoose = require('mongoose');
var Schema = mongoose.Schema;

async function conectar(){
    //------------------------- URL

    //  DOCKER
    const url = 'mongodb://webdevelopmentworkshop-mongodb-1:27017/';

    //  MAQUINA VIRTUAL
    //const url =  'mongodb://agustina:agustina@127.0.0.1:27017/test'
    //const url = 'mongodb://David:bitnami.@127.0.0.1:27017/test';

    await mongoose.connect(url).then(() => {
        console.log('Conexión Exitosa')
    }).catch((error) => {
        console.error('Error al conectar a la base de datos:', error)
    });
}

module.exports = {conectar}