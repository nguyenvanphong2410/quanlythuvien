const express = require('express');
const router = express.Router();
const categoryBookController = require('../controllers/CategoryBookController');

router.post('/create-categories-book', categoryBookController.createCategoriesBook);
router.get('/get-all-categories-book', categoryBookController.getAllCategoriesBook);
router.get('/get-details-categories-book/:id', categoryBookController.getDetailsCategory);
router.put('/update-category-book/:id', categoryBookController.updateCategory);
router.delete('/delete-categories-book/:id', categoryBookController.deleteCategory);


module.exports = router;
