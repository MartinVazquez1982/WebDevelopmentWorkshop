const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schPais = new Schema({
    nombre: String,
    bandera: String,
    recetas:[
        {
            nombre: String,
            descripcion: [String],
            imagen: {
                type:String,
                required: true
            },
            ingredientes: [
                {
                nombre:String,
                cantidad:String,
                opcional:Boolean
                }
            ],
            preparacion: [String],
            consejos: [String]
        }
    ]
});


module.exports = schPais