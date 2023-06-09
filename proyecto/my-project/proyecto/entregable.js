const { MongoClient } = require("mongodb");
const assert = require('assert');
const { query } = require("express");
const { Console } = require("console");
const url = 'mongodb://myapp-mongodb-1:27017/';
const client = new MongoClient(url);
const database = client.db('test');
const recetas = database.collection("recetasDePaises");

// QUERIES

async function cantidadDeRecetasPorPais() {
    try {
        const query = {};
        const options = {
            projection: { "_id": 0, "nombre": 1,"Cantidad de Recetas":{$size:"$recetas"}}};
        const salida =  recetas.find(query, options);
        console.log("Cantidad de Recetas por Pais: \n")
        await salida.forEach(console.dir);
    }  catch(err) {
        console.log(err)
    } finally{
        await client.close()
    }
}

async function recetasConConsejos(){
    try {
        const query ={ recetas:{$elemMatch:{consejos:{$exists: true}}}};
        const options = {
            projection: {_id: 0,recetas:{nombre: 1}}
        }
        const salida = recetas.find(query, options);
        console.log("Recetas con Consejos: \n")
        await salida.forEach(console.dir)
    }  catch(err) {
        console.log(err)
    } finally {
        await client.close()
    }
}

// INSERT

async function insertsRecetas(){
    try {
        const doc = [
            {
                "nombre": "Estados Unidos",
                "bandera": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/203px-Flag_of_the_United_States.svg.png",
                "recetas":[
                    {	
                        "nombre": "Hamburguesa",
                        "descripcion": ["¿Amante de las hamburguesas? ¿Cansado de probar fuera de casa hamburguesas sin sabor y poco jugosas? Tranquilo, hoy te traemos la solución. Esta receta te permitirá hacer una hamburguesa gourmet en casa. Para poder sorprender a tus visitas o bien darte un homenaje con tu pareja ¿lo mejor de todo? Que podemos decir que es una de esas recetas fáciles y rápidas, de esas que no te costará nada de tiempo. Manos a la obra."],
                        "imagen": "https://recetasdeviajes.com/wp-content/uploads/2017/09/Hamburguesa-gourmet-con-bacon.jpg",
                        "ingredientes":[
                            {
                                "nombre": "carne de falda de ternera",
                                "cantidad": "100 gramos",
                                "opcional": false
                            },{
                                "nombre": "carne de babilla de ternera",
                                "cantidad": "100 gramos",
                                "opcional": false
                            },{
                                "nombre": "grasa de ternera",
                                "cantidad": "75 gramos",
                                "opcional": false
                            },
                            {
                                "nombre": "sal",
                                "cantidad": "a gusto",
                                "opcional": false
                            },{
                                "nombre": "Pimienta",
                                "cantidad": "a gusto",
                                "opcional": false
                            },{
                                "nombre": "huevo",
                                "cantidad": "1",
                                "opcional": false
                            },{
                                "nombre": "Pan rallado",
                                "cantidad": "a gusto",
                                "opcional": false
                            },{
                                "nombre": "Pan de hamburguesa",
                                "cantidad": "2",
                                "opcional": false
                            },{
                                "nombre": "lonchas de bacon Campofrío",
                                "cantidad": "4",
                                "opcional": false
                            },{
                                "nombre": "lonchas de queso",
                                "cantidad": "4",
                                "opcional": false
                            },{
                                "nombre": "Kétchup",
                                "cantidad": "a gusto",
                                "opcional": false
                            },{
                                "nombre": "Mostaza",
                                "cantidad": "a gusto",
                                "opcional": false
                            },{
                                "nombre": "rodajas de tomate",
                                "cantidad": "2",
                                "opcional": false
                            }
                        ],
                        "preparacion":["Pon toda la carne picada en un bol, añade un poco de sal y pimienta y mézclala bien con el huevo y posteriormente incluye el pan rallado. Con todos estos ingredientes conseguirás una masa de carne bien compacta.",
                                        "Divide esta masa de carne en dos bolas. Aplástalas individualmente para ir dándoles forma. Al usar pan rallado y huevo, estas hamburguesas quedarán siempre compactas, por lo que no se irán deshaciendo una vez hechas.",
                                        "Monta en un plato el pan de hamburguesa con las lonchas de queso (dos por cada pan) y una rodaja de tomate.",
                                        "Calienta la sartén con unas gotitas de aceite de oliva y prepárate para cocinar la carne. Puedes hacerla según tus gustos, muy hecha o poco hecha. Ahora bien, ten en cuenta que cuanto menos aplastada la pongas, más pequeña será y más gruesa, por lo que el centro podría tardar más en hacerse. Cuando estén listas, colócalas en los panecillos de hamburguesa.",
                                        "Es hora de hacer el bacon crujiente, como más les gusta a los propios americanos. Déjalo en el fuego sin miedo, hasta que quede dorado y crujiente. Cuando esté listo, colócalo encima de las hamburguesas (2 lonchas por cada una).",
                                        "Es hora de hacer el bacon crujiente, como más les gusta a los propios americanos. Déjalo en el fuego sin miedo, hasta que quede dorado y crujiente. Cuando esté listo, colócalo encima de las hamburguesas (2 lonchas por cada una)."],
                        "consejos":["si quieres que el queso quede muy fundido, puedes colocarlo encima de la hamburguesa mientras está en la sartén. Hazlo cuando estén casi listas para sacar. Poco a poco verás como el queso se va fundiendo encima de la carne.", 
                                    "Como verás, pensar en hamburguesas ya no consiste en pensar en esas que a veces vemos por televisión y que tan típicas son en Estados Unidos. A este alimento, con los conocimientos que tenemos, podemos también darle ese toque tan especial que las convertirán en un auténtico manjar."]
                    }
                ]
            
            },
            {
                "nombre":"Chile",
                "bandera":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/1280px-Flag_of_Chile.svg.png",
                "recetas":[
                    {
                        "nombre":"Brazo de Reina",
                        "descripcion": ["Dentro de lo que refiere a la repostería en Chile, podemos destacar que a partir del siglo XVII, las monjas fueron las encargadas de impulsar a ésta por medio de delicias típicas como los dulces de alfajor, el dulce de membrillo y el clásico manjar. Sin embargo, si viajáis hoy al país, es posible que contempléis en cualquier carta de restaurante chileno, dulces como los churros, las empanaditas, la leche asada, el pan de Pascua y el reconocido pastel relleno Brazo de Reina.", 
                                        "Pues bien, haciendo hincapié en éste último, os quisiera resaltar que el mismo se trata de un bizcocho cubierto con crema y diversas mermeladas (moras, fresas), enrollado y decorado con azúcar glasé o bien, con chocolate, merengue o nata.",
                                        "Asimismo, y previamente a comentarles la receta de Brazo de Reina, es importante que sepáis que cada país posee su propia receta y por supuesto, su propio nombre. En este caso, Chile rellena el postre con dulce de leche o como bien comenté, mermelada de frutas."],
                        "imagen":"https://recetasdeviajes.com/wp-content/uploads/2011/10/brazo-gitano.jpg",
                        "ingredientes":[
                            {
                                "nombre":"Huevos",
                                "cantidad":"3",
                                "opcional": false
                            },
                            {
                                "nombre":"Azucar",
                                "cantidad":"75 gramos",
                                "opcional": false
                            },
                            {
                                "nombre":"Harina 0000",
                                "cantidad":"75 gramos",
                                "opcional": false
                            },
                            {
                                "nombre":"vainilla",
                                "cantidad":"1 cucharadita",
                                "opcional": false
                            },
                            {
                                "nombre":"Dulce de Leche",
                                "cantidad":"300 gramos",
                                "opcional": false
                            },
                            {
                                "nombre":"Mantequilla",
                                "cantidad":"Cantidad necesaria",
                                "opcional": false
                            },
                            {
                                "nombre":"Azucar glase",
                                "cantidad":"Cantidad necesaria",
                                "opcional": false
                            }
                        ],
                        "preparacion":["Lo primero que debéis realizar es batir los huevos con el azúcar y la cucharadita de vainilla hasta que observéis que duplica su volumen. A continuación, agregar la harina por medio de un tamiz (colador bien fino) y mezclar con mucho cuidado para evitar que baje la masa.",
                                        "Una vez lista, verter sobre una bandeja para horno (previamente forrada con papel de aluminio, engrasado con un poquito de mantequilla y espolvoreado con harina) la preparación y llevarla a horno de 180 grados por 12 minutos aproximadamente.",
                                        "Pasado el tiempo, volcar la masa sobre un paño de cocina previamente enharinado y rellenar con el dulce de leche. Dejar enfriar por media hora en la heladera.",
                                        "Una vez que está fría la masa con su relleno, recortar las puntas y espolvorear con azúcar o bañar con chocolate deshecho.",
                                        "Recuerden que ésta receta es ideal para realizarla en horas de la merienda o bien, en cualquier momento del día para ingerirla durante el desayuno."]
                    }
                ]
            }
        ];
        const result = await recetas.insertMany(doc)
        console.log(result)
    } finally {
        await client.close()
    }
}

// DELETE

async function deleteRecetas(){
    try {
        const doc = {$or:[{nombre:"Estados Unidos"}, {nombre:"Chile"}]}
        const result = await recetas.deleteMany(doc)
        console.log(result)
    } finally {
        await client.close()
    }
}

// UPDATE

async function updateRecetas(){
    try{
        const filter = {}
        const nuevaRecetas = { $push: {recetas: {

        }}}
        const result = await recetas.updateOne(filter, nuevaRecetas)
        console.log(result)
    } finally {
        await client.close()
    }
}

insertsRecetas()
