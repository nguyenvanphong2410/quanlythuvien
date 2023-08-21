const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/EmployeeController');
const { authMiddleware, authUserMiddleware } = require('../middlewares/authMiddleware');

router.post('/sign-up', employeeController.createUser);
// router.post('/sign-in', userController.loginUser);
// router.put('/update-user/:id', userController.updateUser);
// router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/getAll', employeeController.getAllUser);
// router.get('/get-details/:id', userController.getDetailsUser);
// router.post('/refresh-token', userController.refreshToken);



module.exports = router;
