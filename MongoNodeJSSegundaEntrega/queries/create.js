const recetas = require('../data/recetas.json')

// CREATE

async function insertsRecetas(collection, callback){
    try {
        const result = await collection.insertMany(recetas)
        console.log(result)
    } finally {
        await callback()
    }
}

module.exports = insertsRecetas
    