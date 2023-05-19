const mongoose = require('mongoose');
const data = require('./data/baseDeDatosMongoose.json');
var Schema = mongoose.Schema;

async function conectar(){
    await mongoose.connect('mongodb://myapp-mongodb-1:27017/test').then(() => {
        console.log('Conexión Exitosa')
    }).catch((error) => {
        console.error('Error al conectar a la base de datos:', error)
    });
}

async function cargarBase(modelo ,data){
    try{
        await modelo.create(data);
        console.log('Usuario insertado correctamente');
    } catch (error){
        console.error('Error al insertar el usuarios:', error);
    }
}

async function borrarBase(modelo){
    try{
        await modelo.deleteMany({});
        console.log('Borrado correctamente');
    } catch (error){
        console.error('Error al insertar el usuarios:', error);
    }
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
            ingredientes:[{
            nombre:String,
            cantidad:String,
            opcional:Boolean}],
            preparacion: [String],
            consejos: [String]
        }
    ]
});

var recetasDePaises = mongoose.model('RecetaDePaises', schPais);

conectar().catch(console.dir);

const db = mongoose.connection;


recetasDePaises.find({},{/*"_id": 0, "nombre": 1,"recetas":{"nombre":1}*/})
  .then((resultados) => {
    // Resultados de la consulta
    resultados.forEach(console.log)
  })
  .catch((error) => {
    console.error('Error al realizar la consulta:', error);
  }).finally(() => mongoose.connection.close());

/*
cargarBase(recetasDePaises, data).then(() => {
    mongoose.connection.close()
})*/


/*
borrarBase(recetasDePaises).then(() => {
    mongoose.connection.close()
})*/
