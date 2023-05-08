
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

async function imagenDeRecetas(pais, collection, callback) {
    try {
        const query = {nombre: pais};
        const options = {
            projection: { "_id": 0, recetas:{nombre: 1, imagen: 1}}
        }
        const salida =  collection.find(query, options);
        console.log("Las comidas de " + pais + " tienen esta pinta: " )
        await salida.forEach(console.dir);
    }  catch(err) {
        console.log(err)
    } finally{
        await callback()
    }
}

async function filtrarPaises(cadena, collection, callback) {
    try {
        const query = {nombre: new RegExp('^' + cadena, 'i')};
        const options = {
            projection: { "_id": 0, nombre: 1}
        }
        const salida =  collection.find(query, options);
        await salida.forEach(console.dir);
    }  catch(err) {
        console.log(err)
    } finally{
        await callback()
    }
}

module.exports = {
    cantidadDeRecetasPorPais, 
    recetasConConsejos,
    imagenDeRecetas,
    filtrarPaises
}