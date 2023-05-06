const recetas = require('../data/nuevaReceta.json')

// UPDATE

async function updateRecetas(collection, callback){
    try{
        const filter = {nombre : "Argentina"}
        const nuevaReceta = { $push: {recetas: {
            recetas
        }}
    }
        const result = await collection.updateOne(filter, nuevaReceta)
        console.log(result)
    } finally {
        await callback()
    }
}

module.exports = updateRecetas