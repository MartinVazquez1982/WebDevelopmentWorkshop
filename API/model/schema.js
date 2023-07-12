const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schPais = new Schema({
    nombre: {type: String, unique: true},
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

schPais.post('updateOne', async (doc, next) => {
    const filter = {recetas:[]};
    await Pais.deleteOne(filter);
    next();
});

const Pais = mongoose.model('RecetaDePaises', schPais);

module.exports = Pais;