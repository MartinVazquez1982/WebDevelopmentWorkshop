const { MongoClient } = require("mongodb");
const bd = require('./BD_Data.json');

// -------------------------------- Iportando funciones para querys

const insertsRecetas = require('./queries/create.js')
const { cantidadDeRecetasPorPais, recetasConConsejos } = require('./queries/read.js')
const updateRecetas  = require('./queries/update.js')
const deleteRecetas  = require('./queries/delete.js')

//------------------------- URL

//  DOCKER
//const url = 'mongodb://myapp-mongodb-1:27017/';

//  MAQUINA VIRTUAL
const url =  'mongodb://agustina:agustina@127.0.0.1:27017/test'


const client = new MongoClient(url);
const database = client.db(bd.name);
const collection = database.collection(bd.collection);



//-------------------- QUERIES
// insertsRecetas(collection, () => client.close())
// cantidadDeRecetasPorPais(collection, () => client.close())
// recetasConConsejos(collection, () => client.close())
// deleteRecetas(collection, () => client.close())
// updateRecetas(collection, () => client.close())
