const express = require('express');
const router = express.Router();
const authorController = require('../controllers/AuthorController');

router.post('/create-author', authorController.createAuthor);
router.get('/get-all-author', authorController.getAllAuthor);
router.get('/get-details-author/:id', authorController.getDetailsAuthor);
router.put('/update-author/:id', authorController.updateAuthor);
router.delete('/delete-author/:id', authorController.deleteAuthor);

module.exports = router;
