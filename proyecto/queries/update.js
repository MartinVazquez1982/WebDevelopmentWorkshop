const recetas = require('../data/nuevaReceta.json')

// UPDATE

async function updateRecetas(model, callback){
    try{
        const filter = {nombre : "Argentina"}
        const nuevaReceta = { $push: {recetas: {
            recetas
            }}
        }
        const result = await model.updateOne(filter, nuevaReceta)
        console.log(result)
    } finally {
        await callback()
    }
}

module.exports = updateRecetas