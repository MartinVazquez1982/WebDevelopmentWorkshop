const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Esquemas

const schReceta = new Schema([
    {
        nombre: {
                type: String,
                validate: isNombreRecetaValidate,
                required: true,
        },
        descripcion: {
                type: [String],
                validate: isDescripcionValidate,
                required: true
        },
        imagen: {
                type:String,
                validate: isImagenValidate,
                required: true
        },
        ingredientes: {
            type:[{
                nombre:String,
                cantidad:String,
                opcional:Boolean,
            }],
            validate:isIngredientesValidate,
            required: true
        },
        preparacion: {
                type: [String],
                validate: isPreparacionValidate,
                required: true    
        },
        consejos: {
            type:[String],
            validate: isConsejosValidate,
        }
    }
]);

const schPais = new Schema({
    nombre: {   
            type: String, 
            unique: true,
            validate: isNombreRecetaValidate,
            required: true 
            },
    bandera: {
            type: String,
            validate: isBanderaValidate,
            required: true
    },
    recetas:[ schReceta ]
});

// Verificaciones de datos

function isNombreRecetaValidate() {
    return typeof this.nombre === 'string' && this.nombre.trim().length > 0;
}

function isImagenValidate() {
    return typeof this.imagen === 'string' && this.imagen.trim().length > 0;
}

function isDescripcionValidate() {
    return Array.isArray(this.descripcion) && this.descripcion.length > 0 && this.descripcion.every(item => typeof item === 'string' && item.trim().length > 0);
}

function isPreparacionValidate() {
    return Array.isArray(this.preparacion) && this.preparacion.length > 0 && this.preparacion.every(item => typeof item === 'string' && item.trim().length > 0);
}

function isConsejosValidate() {
    return Array.isArray(this.consejos) && (this.consejos.length > 0 && this.consejos.every(item => typeof item === 'string' && item.trim().length > 0) || this.consejos.length === 0);
}

function isIngredientesValidate() {
    try{
        return Array.isArray(this.ingredientes) && this.ingredientes.length > 0 && this.ingredientes.every(item => item.nombre.length > 0 && item.cantidad.length > 0 && typeof item.opcional === 'boolean');
    } catch(err){
        return false;
    }
}

function isBanderaValidate() {
    return typeof this.bandera === 'string' && this.bandera.trim().length > 0;
}

// Triggers

schPais.post('updateOne', async (doc, next) => {
    const filter = {recetas:[]};
    await Pais.deleteOne(filter);
    next();
});

schPais.pre('updateOne', function(next) {
    const update = this.getUpdate();
    if (update.$push && update.$push.recetas) {
        const nombreRecetaNueva = update.$push.recetas.nombre;
        Pais.findOne(this.getQuery()).then( (doc) => {
        if (doc.recetas.some(receta => receta.nombre === nombreRecetaNueva)) {
            return next(new Error('Ya existe una receta con ese nombre'));
        }
        next();
        }).catch((err) => next(err));
    } else {
        next();
  }
})

const Pais = mongoose.model('RecetaDePaises', schPais);

module.exports = Pais;