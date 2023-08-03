# API Recetario del mundo

Recetario del mundo es una aplicación desarrollada por Burckhardt David, Herrero Juan Francisco y Vazquez Arispe Martín. Estudiantes de Ingeniería en Sistemas en la UNICEN.

Este repositorio es la API con la que 

## Indice
1. [Introducción](#introducción)
2. [Instalando Aplicación](#instalando-api)
3. [Configurar string de conexión con la base de datos](#configurando-string-de-conexión)
4. [Endpoint](#endpoints)

# Introducción

Este repositorio es una API REST desarrollada con Express para gestionar recetas de los diferentes paises del planeta tierra. Permite obtener, editar, crear y borar recetas y paises.

Esta API forma parte de una aplicación. Esta aplicación, Recetario del Mundo, se compone de 2 repositorios: 
- El [frontend] (https://github.com/juanfraherrero/FrontendWebDevelopmentWorkshop)
- El backend (este repositorio)

# Instalando y ejecutando la API

**Se requiere tener previamente instalado NodeJs con npm**

**Se requiere tener previamente instalado Docker o una máquina virtual con el .OVA de [bitnami](https://bitnami.com/stack/mongodb/virtual-machine)**

## Docker

Podemos descargar este repositorio en un .ZIP o usando el comando clone de git. 

Una vez que tenemos el repositorio configuramos el [string de conexión con la base de datos](#configurando-string-de-conexión)

Nos posicionamos en la carpeta raíz del repositorio y en una terminal ejecutamos:

``` docker
docker-compose up
```

Este comando levanta el contenedor ejecutando todo lo necesario. 

### Cargando datos a la base para testear

En caso de que quisieramos simplementer probar la base podemos ejecutar los siguientes comandos para cargar varias recetas en la base y así tstearla funcionalidad. Si no se quiere cargar recetas no ejecutamos el comando.

Entramos dentro del contenedor de la API
``` docker
docker-compose exec {NombreContenedor} bash 
```

Accedemos a la carpeta *.API/loadDataBase* usando el comando *cd*
``` bash
node load.js
```

Este último comando se encargará de cargar las recetas

## Maquina Virtual con .OVA de Bitnami

Descargamos el repositorio en un .zip o clonamos el repositorio.

Luego, debemos copiar la carpeta *./API* a la Máquina Virtual.

Luego entramos a la máuina virtual, y parados en la carpeta que copiamos a la máquina virtual (dentro de *./API*) ejecutamos el siguiente comando para descargar todas las dependencias:

``` bash
npm install
```
Configuramos el [string de conexión con la base de datos](#configurando-string-de-conexión)

Una vez instaladas las dependencias y configurados los strings de conexión podemos ejecutar la API usando el comando.

``` bash
npm run start
```

# Configurando String de Conexión

Una vez que tenemos descargados los repos deberemo configurar los string de conexión para poder acceder correctamente a la base de datos.

Para esto debemos modificar el archivo ./API/controllers/conectionDataBase.js cerca de la línea 8 donde se declara la constante *url* debemos reempĺazar el string por nuestro string de conexión con la base de datos.

Esta modificación e spara el uso del *npm run start*.

## Segunda forma de configurar string de Conexión

Una segunda forma es en el *./package.json* creamos un script propio donde configuramos la variable de entorno *STRING_URL_MONGO* con el string de conexión

# Endpoints

## GET
- **/recipes** -> Retorna los paises
- **/recipes/{NombrePais}** -> Retorna las recetas del pais
- **/recipes/{NombrePais}/{NombreReceta}** -> Retorna la información completa de la receta

## PUT
- **/recipes/{NombrePais}/{NombreReceta}** -> Se el pasa un json en le body de la petición con los atributos a modificar de la receta

## POST
- **/recipes** -> Se le pasa un json en el body de la petición con los atributos del pais y la receta, si el pais no existe lo crea

## DELETE
- **/recipes/{NombrePais}/{NombreReceta}** -> Borra la receta seleccionada

## Formato del JSON qu recibe la API

``` json
{
    "nombre": "Nombre del país",
    "bandera": "URL de la bandera del país",
    "recetas": [
        {
            "nombre": "Nombre de la receta",
            "descripcion": ["Descripción de la receta"],
            "imagen": "URL de la imagen de la receta",
            "ingredientes": [
        {
            "nombre": "Nombre del ingrediente",
            "cantidad": "Cantidad del ingrediente",
            "opcional": true or false
        }
        ],
            "preparacion": ["Pasos de preparación de la receta"],
            "consejos": ["Consejos útiles para cocinar la receta"]
        }
    ]
}
```

# Consideraciones de la base de datos

- No se permite a dos países con el mismo nombre
- No se permite que un país tenga dos recetas que se llamen igual
- Si un país no contiene más recetas, se elimina automáticamente
- En cuentos a los atributos de los documentos:
    - nombre (País), bandera, nombre(Receta) e imagen tienen que ser String y no pueden ser una cadena vacía.
    - Preparación, Descripción y Consejos tienen que ser un Array de String y no pueden tener celdas donde se encuentren string vacíos.
    - ingredientes tienen que tener al menos uno y que cumpla correctamente con el esquema.