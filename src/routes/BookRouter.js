const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');

router.post('/create-book', bookController.createBook);
router.get('/get-all-book', bookController.getAllBook);
router.put('/update-book/:id', bookController.updateBook);
router.get('/get-details-book/:id', bookController.getDetailsBook);



module.exports = router;
