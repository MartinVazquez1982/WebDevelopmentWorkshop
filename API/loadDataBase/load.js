var conection = require('../controller/conectionDataBase.js');
var model = require('../model/schema.js');
const mongoose = require('mongoose');
const data = require('./DB.json');

conection.conectar();

model.create(data)
    .then(() => console.log('Carga exitosa'))
    .catch((err) => console.error("Error: ", err))
    .finally(() => mongoose.connection.close());