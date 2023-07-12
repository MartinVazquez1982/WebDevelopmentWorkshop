var model = require('../model/schema.js');

// Inserts
async function insertPais(req, res){
    try{
        const data = req.body;
        await model.create(data);
        res.status(200).json({status: "OK", message: "Insercion Exitosa"});
    } catch(err){
        res.status(500).json({message: err.message});
    }
}

async function insertReceta(req, res){
    try{
        const countryId = req.params.country;
        const data = req.body;
        const filter = {nombre : countryId};
        const nuevaReceta = { $push: {recetas: data} };
        await model.updateOne(filter, nuevaReceta);
        res.status(200).json({status: "OK", message: "Insercion Exitosa"});
    } catch(err){
        res.status(500).json({message: err.message});
    }
}

// Delete
async function deleteReceta(req, res){
    try{
        const countryId = req.params.country;
        const recipeId = req.params.recipe;
        const filter = {nombre: countryId};
        const actualizacion = {$pull:{recetas:{ nombre: recipeId}}};
        await model.updateOne(filter, actualizacion);
        res.status(200).json({status: "OK", message: "Eliminacion Exitosa"});
    } catch(err){
        res.status(500).json({message: err.message});
    }
}

// Update
async function updateReceta(req, res){
    try{
        const countryId = req.params.country;
        const recipeId = req.params.recipe;
        const filter = {nombre: countryId, 'recetas.nombre': recipeId};
        const data = req.body;
        const actualizacion = {};
        for (const campo in data){
            const clave = "recetas.$."+campo;
            actualizacion[clave] = data[campo];
        }
        console.log(actualizacion);
        await model.updateOne(filter,{$set: actualizacion});
        res.status(200).json({status: "OK", message: "Actualizacion Exitosa"});
    } catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    insertPais,
    insertReceta,
    deleteReceta,
    updateReceta
}