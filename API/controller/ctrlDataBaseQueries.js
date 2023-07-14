var model = require('../model/schema.js');

async function datosPaises(req, res){
    try {
        const query = {};
        const options = {
            "_id": 0, nombre: 1, bandera: 1
        };
        const salida = await model.find(query, options).sort({nombre:1});
        res.status(200).json(salida);
    } catch(err){
        res.status(500).json({status: "Fallo en API-Rest", message: err.message});
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
        res.status(200).json(salida[0].recetas);
    } catch(err){
        res.status(500).json({status: "Fallo en API-Rest", message: err.message});
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
        res.status(200).json(salida[0].recetas[0]);
    } catch(err){
        res.status(500).json({status: "Fallo en API-Rest", message: err.message});
    }
}


module.exports = {
    datosPaises,
    recetasPais,
    datosReceta
}