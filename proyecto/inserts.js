const { MongoClient } = require("mongodb");
const assert = require('assert');
const url = 'mongodb://myapp-mongodb-1:27017/';
const client = new MongoClient(url);
async function run() {
try {
    const database = client.db('test');
    const recetas = database.collection("recetasDePaises");
    const doc = {
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
            }]}
            const result = await recetas.insertOne(doc)
            console.log(result)
} finally { await client.close(); } }
run().catch(console.dir);