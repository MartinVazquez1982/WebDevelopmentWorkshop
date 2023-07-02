# Prueba API REST - Comando curl

## Aclaraciones
----
- Los archivos JSON en donde se encuentran los datos para las ejecuciones de las peticiones HTTP POST y PUT, estan en la carpeta Data

## Comando Curl
----
### **POST**

### Insertar un Pais

*Italia:*

`curl -X POST -H "Content-Type: application/json" -d @italia.json http://localhost:3000/recipes/insertPais`

*China:*

`curl -X POST -H "Content-Type: application/json" -d @china.json http://localhost:3000/recipes/insertPais`

### Insertar una Receta

*Buffalo wings:*

`curl -X POST -H "Content-Type: application/json" -d @buffaloWings.json "http://localhost:3000/recipes/insertRecipe/Estados%20Unidos"`

*Palmeni*

`curl -X POST -H "Content-Type: application/json" -d @palmeni.json http://localhost:3000/recipes/insertRecipe/Rusia`

*Anotaciones:* 
- *Colocar la consola en la carpeta que se encuentra los archivos JSON*
- *Content-Type: application/json entre comillas dobles (Al menos en Windows)*
#
### **GET**

*Paises con su bandera*

`curl http://localhost:3000/recipes`

*Nombre de receta e imagen de las recetas de un pais*

`curl http://localhost:3000/recipes/Alemania`

`curl "http://localhost:3000/recipes/Estados%20Unidos"`

*Datos de una receta*

`curl "http://localhost:3000/recipes/Brasil/Frijoles%20estilo%20tropeiro"`

`curl "http://localhost:3000/recipes/Chile/Brazo%20de%20Reina"`

#

### **DELETE**

### Borrar una receta

*Pasta con salmon y nata de italia*

`curl -X DELETE "http://localhost:3000/recipes/deleteRecipe/Italia/Pasta%20con%20salmon%20y%20nata"`

*Palmeni de Rusia*

`curl -X DELETE http://localhost:3000/recipes/deleteRecipe/Rusia/Palmeni`

#

### **PUT**

*Pasta con salmon y nata de Italia*

`curl -d @upPastaConSalmonYNata.json -H "Content-Type: application/json" -X PUT "http://localhost:3000/recipes/Italia/Pasta%20con%20salmon%20y%20nata"`

*Churrasco de Argentina*

`curl -d @upChurrasco.json -H "Content-Type: application/json" -X PUT "http://localhost:3000/recipes/Argentina/Churrasco"`


*Bife de lomo (Despues de modificar la receta de churrasco)*

`curl -d @upBifeDeLomo.json -H "Content-Type: application/json" -X PUT http://localhost:3000/recipes/update/Argentina/Bife%20de%20Lomo`

*Anotaciones:* 
- *Colocar la consola en la carpeta que se encuentra los archivos JSON*
- *Content-Type: application/json entre comillas dobles (Al menos en Windows)*