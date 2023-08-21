const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');

router.post('/create-book', bookController.createBook);
router.get('/get-all-book', bookController.getAllBook);




module.exports = router;
