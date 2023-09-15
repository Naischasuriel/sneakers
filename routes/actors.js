const express = require('express');
const router = express.Router();
const actorsCtrl = require('../controllers/actors');
// const actorsController = require('../controllers/actorsController');

// This router is mounted to a "starts with" path of '/'

// GET /actors/new (new functionality)
router.get('/actors/new', actorsCtrl.new);
// POST /actors (create functionality)
router.post('/actors', actorsCtrl.create);
// POST /tvshows/:id/actors (associate an actor with a tvshow)
router.post('/tvshows/:id/actors', actorsCtrl.addToCast);
//add delete route
router.delete('/actors/:id', actorsCtrl.delete);

module.exports = router;
