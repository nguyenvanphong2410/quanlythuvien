const express = require('express');
const router = express.Router();
const categoryBookController = require('../controllers/CategoryBookController');

router.post('/create-categories-book', categoryBookController.createCategoriesBook);
router.get('/get-all-categories-book', categoryBookController.getAllCategoriesBook);

module.exports = router;
