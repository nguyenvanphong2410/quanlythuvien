const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/EmployeeController');

router.post('/sign-up', employeeController.createUser);
router.get('/getAll', employeeController.getAllUser);
router.put('/update-employee/:id', employeeController.updateEmployee);
router.get('/get-details/:id', employeeController.getDetailsEmployee);
router.post('/get-info', employeeController.getInfoEmployee);
router.delete('/delete-employee/:id',employeeController.deleteEmployee);
// router.post('/refresh-token', employeeController.refreshToken);

module.exports = router;
