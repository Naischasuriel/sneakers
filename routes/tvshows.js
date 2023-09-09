const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const tvshowsCtrl = require('../controllers/tvshows');
	
// GET /tvshows
router.get('/', tvshowsCtrl.index);
// GET /tvshows/new
router.get('/new', tvshowsCtrl.new);
// GET /tvshows/:id (show functionality) MUST be below new route
router.get('/:id', tvshowsCtrl.show);
// POST /tvshows
router.post('/', tvshowsCtrl.create);
// PUT /tvshows
router.put('/:id', tvshowsCtrl.update);
// DELETE /tvshows
router.delete('/:id', tvshowsCtrl.delete);

	
module.exports = router;
