var model = require('../model/schema.js');

// Inserts
async function insertPais(req, res){
    try{
        const data = req.body;
        await model.create(data);
        res.send('Insercion exitosa');
    } catch(err){
        res.status(500);
        res.send(err.menssage);
    }
}

async function insertReceta(req, res){
    try{
        const countryId = req.params.country;
        const data = req.body;
        const filter = {nombre : countryId};
        const nuevaReceta = { $push: {recetas: data} };
        await model.updateOne(filter, nuevaReceta);
        res.send('Insercion exitosa');
    } catch(err){
        res.status(500);
        res.send(err.menssage);
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
        res.send('Eliminacion exitosa');
    } catch(err){
        res.status(500);
        res.send(err.menssage);
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
        res.send('Actualizacion exitosa');
    } catch(err){
        res.status(500);
        res.send(err.menssage);
    }
}

module.exports = {
    insertPais,
    insertReceta,
    deleteReceta,
    updateReceta
}