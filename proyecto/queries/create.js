const recetas = require('../data/recetas.json')

// CREATE

async function insertsRecetas(model, callback){
    try {
        const result = await model.insertMany(recetas)
        console.log(result)
    } finally {
        await callback()
    }
}

module.exports = insertsRecetas
    