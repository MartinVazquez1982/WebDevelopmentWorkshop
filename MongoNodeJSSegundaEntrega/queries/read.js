
// READ

async function cantidadDeRecetasPorPais(collection, callback) {
    try {
        const query = {};
        const options = {
            projection: { "_id": 0, "nombre": 1,"Cantidad de Recetas":{$size:"$recetas"}}
        };
        const salida =  collection.find(query, options);
        console.log("Cantidad de Recetas por Pais: \n")
        await salida.forEach(console.dir);
    }  catch(err) {
        console.log(err)
    } finally{
        await callback()
    }
}

async function recetasConConsejos(collection, callback){
    try {
        const query ={ recetas:{$elemMatch:{consejos:{$exists: true}}}};
        const options = {
            projection: {_id: 0,recetas:{nombre: 1}}
        }
        const salida = collection.find(query, options);
        console.log("Recetas con Consejos: \n")
        await salida.forEach(console.dir)
    }  catch(err) {
        console.log(err)
    } finally {
        await callback()
    }
}

module.exports = {
    cantidadDeRecetasPorPais, 
    recetasConConsejos
}