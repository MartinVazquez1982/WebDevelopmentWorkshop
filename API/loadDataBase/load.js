var conection = require('../controller/conectionDataBase.js');
var model = require('../model/schema.js');
const mongoose = require('mongoose');
const data = require('./DB.json');

async function CargarBase() {
    try {
      await model.deleteMany({}); // Eliminar todos los documentos de la colección
      console.log('Base de datos vaciada correctamente.');
      // Ahora, podemos realizar la carga con nuevos datos
      await model.create(data);
      console.log('Carga exitosa');
    } catch (err) {
      console.error('Error: ', err);
    } finally {
      mongoose.connection.close();
    }
  }
  
conection.conectar();
CargarBase();