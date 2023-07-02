var model = require('../model/schema.js');

async function datosPaises(req, res){
    try {
        const query = {};
        const options = {
            "_id": 0, nombre: 1, bandera: 1
        };
        const salida = await model.find(query, options);
        res.json(salida);
    } catch(err){
        console.log(err)
    }
}

async function recetasPais(req, res){
    try {
        const countryId = req.params.country;
        const query = {nombre: countryId};
        const options = {
            "_id":0, 'recetas.nombre':1, 'recetas.imagen':1
        };
        const salida = await model.find(query, options);
        res.json(salida);
    } catch(err){
        console.log(err);
    }
}

async function datosReceta(req, res){
    try{
        const countryId = req.params.country;
        const recetaId = req.params.recipe;
        const query = {nombre: countryId, 'recetas.nombre': recetaId};
        const options = {
            "_id":0, 'recetas.$': 1
        };
        const salida = await model.find(query, options);
        res.json(salida);
    } catch(err){
        console.log(err);
    }
}


module.exports = {
    datosPaises,
    recetasPais,
    datosReceta
}