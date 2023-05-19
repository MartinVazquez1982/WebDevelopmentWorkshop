const mongoose = require('mongoose');
const data = require('./data/baseDeDatos.json')
var Schema = mongoose.Schema;

async function conectar(){
    //------------------------- URL

    //  DOCKER
    const url = 'mongodb://myapp-mongodb-1:27017/';

    //  MAQUINA VIRTUAL
    //const url =  'mongodb://agustina:agustina@127.0.0.1:27017/test'
    //const url = 'mongodb://David:bitnami.@127.0.0.1:27017/test';

    await mongoose.connect(url).then(() => {
        console.log('Conexión Exitosa')
    }).catch((error) => {
        console.error('Error al conectar a la base de datos:', error)
    })
}

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

var recetasDePaises = mongoose.model('RecetaDePaises', schPais);

conectar().catch(console.dir);

recetasDePaises.create(data).then(() => console.log('Insertado con Exito')).catch((err) => console.error("Error: ", err)).finally(() => mongoose.connection.close());