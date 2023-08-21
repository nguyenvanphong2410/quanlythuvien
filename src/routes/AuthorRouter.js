const express = require('express');
const router = express.Router();
const authorController = require('../controllers/AuthorController');

router.post('/create-author', authorController.createAuthor);
router.get('/get-all-author', authorController.getAllAuthor);

module.exports = router;
