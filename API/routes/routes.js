var express = require('express');
var readDatabase = require('../controller/ctrlDataBaseQueries');
var modifyDatabase = require('../controller/ctrlDataBaseModify');
var router = express.Router();

// Get
router.get('/', readDatabase.datosPaises);
router.get('/:country', readDatabase.recetasPais);
router.get('/:country/:recipe', readDatabase.datosReceta);

// Post
router.post('/insertPais', modifyDatabase.insertPais);
router.post('/insertRecipe/:country', modifyDatabase.insertReceta);

// Put
router.put('/:country/:recipe', modifyDatabase.updateReceta);

//Delete
router.delete('/:country/:recipe', modifyDatabase.deleteReceta);

module.exports = router;