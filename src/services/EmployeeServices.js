const Employee = require('../models/EmployeeModel')
const bcrypt = require("bcrypt");
const moment = require("moment");
const { generatePassword } = require('../helpers/index');
const { responseSuccess, responseError } = require('../utils/ResponseHandle');


const createEmployee = (newEmployee, res) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newEmployee;
        console.log('newEmployee:', newEmployee);
        try {
            //Lấy ra 1 email 1phone
            const checkUser = await Employee.findOne({ email: email })
            const checkPhone = await Employee.findOne({ phone: phone })

            if (checkUser) {
                return responseError(res, 400, 'email', 'Email này đã tồn tại !!! ')
            } else if ((checkPhone)) {
                return responseError(res, 400, 'phone', 'Số điện thoại này đã tồn tại !!! ')
            }

            const createdEmployee = await Employee.create({
                name,
                email,
                password: await generatePassword(password),
                phone
            });

            if (createdEmployee) {
                console.log('Tạo người dùng thành công ');
                return responseSuccess(res, {
                    status: 'OK',
                    message: 'Đăng ký thành công',
                }, 200);

            }
        } catch (e) {
            return responseError(res, 500, 'err', 'Tạo mới nhân viên thất bại !!! ')
        }
    })
}

//getAllUser User Service
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await Employee.find({ deleted_at: null });

            resolve({
                status: 'OK',
                message: 'Lấy ra toàn bộ nhân viên thành công',
                data: allUser
            })

        } catch (e) {
            return responseError(res, 500, 'err', 'Lấy ra toàn bộ nhân viên thất bại !!! ')
        }
    })
}

//updateEmployee 
const updateEmployee = (id, data, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkEmployee = await Employee.findOne({ _id: id })
            const checkEmail = await Employee.findOne({ email: data.email });
            const checkPhone = await Employee.findOne({ phone: data.phone });

            //Kiem tra employee khong ton tai 
            if (checkEmployee === null) {
                return responseError(res, 400, 'not found', 'Nhân viên này không tồn tại !!! ')
            }
            else if (checkEmail) {
                return responseError(res, 400, 'email', 'Email này đã tồn tại !!! ')
            }
            else if (checkPhone) {
                return responseError(res, 400, 'phone', 'Số điện thoại này đã tồn tại !!! ')
            }

            const updatedUser = await Employee.findByIdAndUpdate(id, data, { new: true });

            console.log('Update User', updatedUser);

            return responseSuccess(res, {
                status: 'OK',
                message: 'Cập nhật thông tin thành công',
                data: updatedUser
            }, 200);

        } catch (e) {
            return responseError(res, 500, 'err', 'Cập nhật nhân viên thất bại !!! ')
        }
    })
}


//getDetailsEmployee
const getDetailsEmployee = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Lấy ra 1 email theo id
            const user = await Employee.findOne({
                _id: id
            })

            //Login : Kiem tra user khong ton tai 
            if (user === null) {
                return reject.status(500).json({
                    status: 'Ok',
                    message: 'Nhân viên này không tồn tại !'
                })
            }

            resolve({
                status: 'OK',
                message: 'Lấy 1 nhân viên thành công',
                data: user
            })

        } catch (e) {
            return responseError(res, 500, 'err', 'Lấy ra thông tin của 1 nhân viên thất bại !!! ')
        }
    })
}

//deleteEmployee
const deleteEmployee = (id, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkEmployee = await Employee.findOne({ _id: id })

            if (checkEmployee === null) {
                return responseError(res, 400, 'not found', 'Không tồn tại nhân viên này !!! ')
            }

            checkEmployee.deleted_at = moment();
            await checkEmployee.save()

            return responseSuccess(res, {
                message: `Xóa ${checkEmployee.name} thành công`,
            }, 200);

        } catch (e) {
            return responseError(res, 500, 'err', 'Xóa nhân viên thất bại !!! ')
        }
    })
}


module.exports = {
    createEmployee,
    updateEmployee,
    getDetailsEmployee,
    getAllUser,
    deleteEmployee,

}
