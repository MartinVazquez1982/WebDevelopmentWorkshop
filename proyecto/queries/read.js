
// READ

async function cantidadDeRecetasPorPais(model, callback) {
    try {
        const query = {};
        const options = {
            "_id": 0, "nombre": 1,"Cantidad de Recetas":{$size:"$recetas"}
        };
        const salida = await model.find(query, options);
        console.log("Cantidad de Recetas por Pais: \n")
        console.log(salida);
    }  catch(err) {
        console.log(err)
    } finally{
        await callback()
    }
}

async function recetasConConsejos(model, callback){
    try {
        const query ={ recetas:{$elemMatch:{consejos:{$exists: true}}}};
        const options = {
            _id: 0,
            recetas:{nombre: 1}
        }
        const salida = await model.find(query, options);
        console.log("Recetas con Consejos: \n")
        console.log(salida);
    }  catch(err) {
        console.log(err)
    } finally {
        await callback()
    }
}

async function imagenDeRecetas(pais, model, callback) {
    try {
        const query = {nombre: pais};
        const options = {
            "_id": 0, recetas:{nombre: 1, imagen: 1}
        }
        const salida = await model.find(query, options);
        console.log("Las comidas de " + pais + " tienen esta pinta: " )
        console.log(salida);
    }  catch(err) {
        console.log(err)
    } finally{
        await callback()
    }
}

async function filtrarPaises(cadena, model, callback) {
    try {
        const query = {nombre: new RegExp('^' + cadena, 'i')};
        const options = {
            "_id": 0, nombre: 1
        }
        const salida = await model.find(query, options);
        console.log(salida);
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