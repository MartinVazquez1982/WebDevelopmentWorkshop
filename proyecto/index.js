const mongoose = require('mongoose');
var Schema = mongoose.Schema;

async function conectar(){
    //------------------------- URL

    //  DOCKER
    const url = 'mongodb://myapp-mongodb-1:27017/';

    //  MAQUINA VIRTUAL
    //const url =  'mongodb://agustina:agustina@127.0.0.1:27017/test'
    //const url = 'mongodb://David:bitnami.@127.0.0.1:27017/test';

    await mongoose.connect(url).then(() => {
        console.log('Conexión Exitosa')
    }).catch((error) => {
        console.error('Error al conectar a la base de datos:', error)
    });
}

const schPais = require("./schemas/schPais.js")

var recetasDePaises = mongoose.model('RecetaDePaises', schPais);
module.exports = recetasDePaises;

conectar().catch(console.dir);


// -------------------------------- Importando funciones para querys

const insertsRecetas = require('./queries/create.js')
const { cantidadDeRecetasPorPais, recetasConConsejos, filtrarPaises, imagenDeRecetas} = require('./queries/read.js')
const updateRecetas  = require('./queries/update.js')

//-------------------- QUERIES

insertsRecetas(recetasDePaises, () => mongoose.connection.close())
// cantidadDeRecetasPorPais(recetasDePaises, () => mongoose.connection.close())
// filtrarPaises('A', recetasDePaises, () => mongoose.connection.close()) //Se envia una cadena para filtrar los paises
// imagenDeRecetas('Argentina', recetasDePaises, () => mongoose.connection.close()) //Se envia un pais por el cual se quieren filtrar las recetas
// recetasConConsejos(recetasDePaises, () => mongoose.connection.close())
// deleteRecetas(recetasDePaises, () => mongoose.connection.close())
// updateRecetas(recetasDePaises, () => mongoose.connection.close())
