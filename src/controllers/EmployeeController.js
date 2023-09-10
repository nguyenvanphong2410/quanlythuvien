const EmployeeService = require('../services/EmployeeServices')
const JwtServices = require('../services/JwtServices')
const Employee = require('../models/EmployeeModel')
const jwt = require('jsonwebtoken');
const { responseSuccess, responseError } = require('../utils/ResponseHandle');

const createUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        console.log(req.body);

        //Chuỗi so sánh
        const hasNumber = /\d/;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        const isCheckEmail = reg.test(email);
        const isTrueName = specialChars.test(name)
        const ishasNumberName = hasNumber.test(name);

        if (!name || !email || !password || !phone) {
            return responseError(res, 400, 'null', 'Thông tin trống !!! ')

        } else if (!isCheckEmail) {
            return responseError(res, 400, 'email', 'Email này không hợp lệ !!! ')

        } else if (isTrueName) {
            return responseError(res, 400, 'name', 'Tên không hợp lệ !!! ')

        } else if (ishasNumberName) {
            return responseError(res, 400, 'name', 'Tên có chứa số !!! ')
        }

        const response = await EmployeeService.createEmployee(req.body, res);
        return res.json(response);

    } catch (e) {
        return responseError(res, 500, 'err','Tạo mới nhân viên thất bại !!! ')
    }
};

//getAllUser User
const getAllUser = async (req, res) => {
    try {

        const response = await EmployeeService.getAllUser();
        return res.status(200).json(response);
    } catch (e) {
        return responseError(res, 500, 'err', 'Lấy toàn bộ nhân viên thất bại !!! ')
    }
};


//Update User
const updateEmployee = async (req, res) => {
    try {
        //Nhận vào user id qua url
        const userId = req.params.id
        const { name, email, phone } = req.body;
        const data = req.body;
        console.log(data);

        //Chuỗi so sánh
        const hasNumber = /\d/;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        const isCheckEmail = reg.test(email);
        const ishasNumberName = hasNumber.test(name);
        const isTrueName = specialChars.test(name)
        const isTruePhone = specialChars.test(phone)

        if (!userId) {
            return responseError(res, 400, 'not found', 'Nhân viên không tồn tại !!! ')
        }
        
        if (!name || !email || !phone) {
            return responseError(res, 400, 'null', 'Thông tin trống !!! ')
        } else if (!isCheckEmail) {
            return responseError(res, 400, 'email', 'Email này không hợp lệ !!! ')
        } else if (isTrueName) {
            return responseError(res, 400, 'name', 'Tên không hợp lệ !!! ')
        } else if (ishasNumberName) {
            return responseError(res, 400, 'name', 'Tên có chứa số !!! ')
        } else if (isTruePhone) {
            return responseError(res, 400, 'phone', 'Tên không hợp lệ !!! ')
        }

        console.log('ID của 1 user: ', userId);
        const response = await EmployeeService.updateEmployee(userId, data, res);

        return res.status(200).json(response);
    } catch (e) {
        return responseError(res, 500, 'err','Cập nhật nhân viên thất bại !!! ')

    }
};

//deleteEmployee
const deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id
        // const token = req.headers

        //Kiem tra employeeId co hop le
        if (!employeeId) {
            return res.status(200).join({
                status: 'ERR',
                message: 'Khong ton tai nhan vien'
            });
        }

        console.log('ID của 1 employee: ', employeeId);
        const response = await EmployeeService.deleteEmployee(employeeId);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: 'deleteEmployee Lỗi '
        })
    }
};


//getDetailsEmployee
const getDetailsEmployee = async (req, res) => {
    try {
        const userId = req.params.id

        //Kiem tra userId co hop le
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required(userId kh hợp lệ)'
            });
        }

        console.log('ID của 1 user: ', userId);
        const response = await EmployeeService.getDetailsEmployee(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: ' getDetailsEmployee Loi nha, co the la loi id '
        })
    }
};

//getInfoEmployee
const getInfoEmployee = async (req, res) => {
    try {
        const token = req.cookies.token
        // const { token } = req.body; // Lấy token 
        console.log("token là: ", token.token);

        // Kiểm tra token có tồn tại hay không
        if (!token.token) {
            return res.status(401).json({
                status: 'ERR',
                message: 'Access denied. No token provided !'
            });
        }

        // Xác thực và lấy thông tin từ token
        const decoded = jwt.verify(token.token, 'access_token',);
        console.log("decoded là: ", decoded);


        // Lấy id người dùng từ payload của token
        const userId = decoded.payload.id;
        console.log('ID của 1 user: ', userId);

        // const userId = req.params.id

        //Kiem tra userId co hop le
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required(userId kh hợp lệ !!!)'
            });
        }

        const response = await EmployeeService.getDetailsEmployee(userId);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: ' get-info Loi nha, '
        })
    }
};


module.exports = {
    createUser,
    getAllUser,
    updateEmployee,
    getDetailsEmployee,
    getInfoEmployee,
    deleteEmployee,
}