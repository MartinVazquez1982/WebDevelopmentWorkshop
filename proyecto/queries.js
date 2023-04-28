const { MongoClient } = require("mongodb");
const assert = require('assert');
const { query } = require("express");
const url = 'mongodb://myapp-mongodb-1:27017/';
const client = new MongoClient(url);
async function recetasPorPais() {
    try {
        const database = client.db('test');
        const recetas = database.collection("recetasDePaises");
        const query = {};
        const options = {
            projection: {"_id":0,"nombre":1,"recetas":{"nombre":1}},
        };
        const movie = recetas.find(query,options);
        await movie.forEach(console.dir);
    } finally { 
        await client.close(); 
    } 
}
async function cantidadDeRecetasPorPais(){
    try{
        const database = client.db('test');
        const recetas = database.collection("recetasDePaises");
        const query = {};
        const options = {
            projection: { "_id": 0, "nombre": 1,"Cantidad de Recetas":{$size:"$recetas"}}};
        const salida = recetas.find(query, options);
        await salida.forEach(console.dir);
    } finally {
        await client.close();
    }
}

recetasPorPais().catch(console.dir);
cantidadDeRecetasPorPais().catch(console.dir);