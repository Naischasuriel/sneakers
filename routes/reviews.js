const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// POST /tvshows/:id/reviews (create review for a tvshow)
router.post('/tvshows/:id/reviews', reviewsCtrl.create);

module.exports = router;