const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/EmployeeController');
const { authMiddleware, authUserMiddleware } = require('../middlewares/authMiddleware');

router.post('/sign-up', employeeController.createUser);
router.post('/login', employeeController.loginEmployee);
router.get('/getAll', employeeController.getAllUser);
router.put('/update-employee/:id', employeeController.updateEmployee);
router.get('/get-details/:id', employeeController.getDetailsEmployee);
// router.delete('/delete-user/:id', authMiddleware, employeeController.deleteUser);
// router.post('/refresh-token', employeeController.refreshToken);


module.exports = router;
