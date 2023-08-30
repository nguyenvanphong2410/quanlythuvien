const Employee = require('../models/EmployeeModel')
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require('./JwtServices');
const dotenv = require('dotenv');
const mongooseDelete = require('mongoose-delete');
const moment = require("moment");


const createEmployee = (newEmployee, res) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newEmployee;
        console.log('newEmployee:', newEmployee);
        try {

            //Lấy ra 1 email 1phone
            const checkUser = await Employee.findOne({ email: email })
            const checkPhone = await Employee.findOne({ phone: phone })

            //Kiem tra email da ton tai trong db
            if (checkUser !== null) {
                return res.json({
                    status: 'ERR',
                    message: 'Email này đã tồn tại'
                })
            } else if ((checkPhone)) {
                //Kiem tra Phone da ton tai trong db
                return res.json({
                    status: 'ERR',
                    message: 'Phone này đã tồn tại'
                })

            }

            //Mã hóa pass
            const hash = bcrypt.hashSync(password, 10);
            console.log('hash', hash);

            const createdEmployee = await Employee.create({
                name,
                email,
                password: hash,
                phone
            });

            if (createdEmployee) {
                console.log('Tạo người dùng thành công ');
                return res.json({
                    status: 'OK',
                    message: 'Đăng ký thành công',
                    // data: createdEmployee
                })
            }
        } catch (e) {
            reject(e);
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
                message: 'Lấy ra toàn bộ User SUCCESS',
                data: allUser
            })

        } catch (e) {
            reject(e);
        }
    })
}
const loginEmployee = (employeeLogin, res) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = employeeLogin;
        try {
            //Lấy ra 1 email 1phone
            const checkUser = await Employee.findOne({ email: email })

            //Login : Kiem tra email khong ton tai 
            if (checkUser === null) {
                return reject({
                    status: 'Ok',
                    message: 'The email is not defined(Email này không tồn tại trong db)'
                })
            }
            // Kiểm tra trạng thái của người dùng
            if (checkUser.status === '1') {
                return res.json({
                    status: 'ERR',
                    message: 'Tài khoản bị khóa !'
                });
            }

            //so sanh password dưa vào
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            // console.log('So sánh password: ', comparePassword);

            //Kiểm tra password sai
            if (!comparePassword) {
                return reject({
                    status: 'Ok',
                    message: 'The password or user is incorrect(Mk hoặc ngdg không chính xác)'
                })
            }


            //Sau khi logi thanh cong lấy token
            const access_token = await genneralAccessToken({
                //truyền payload vào 
                id: checkUser.id,
                email: checkUser.email,
                name: checkUser.name,
                // isAdmin: checkUser.isAdmin
            })

            //Trả về refresh token
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                // isAdmin: checkUser.isAdmin
            })

            console.log('>> Trả về access_token', access_token);

            resolve({
                status: 'OK',
                message: 'Đăng nhập thành công SUCCESS',
                access_token,
                refresh_token
            })

        } catch (e) {
            reject(e);
        }
    })
}

//Update User Service
const updateEmployee = (id, data, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkEmployee = await Employee.findOne({ _id: id })
            const checkEmail = await Employee.findOne({ email: data.email });
            const checkPhone = await Employee.findOne({ phone: data.phone });

            //Kiem tra employee khong ton tai 
            if (checkEmployee === null) {
                return res.json({
                    status: 'ERR',
                    message: 'Nhân viên này không tồn tại !'
                })
            } else if (checkEmail) {
                //Kiem tra email da ton tai 
                return res.json({
                    status: 'ERR',
                    message: 'Email này đã tồn tại !'
                })
            } else if (checkPhone) {
                //Kiem tra Phone da ton tai 
                return res.json({
                    status: 'ERR',
                    message: 'Phone này đã tồn tại !'
                })
            }

            // const updatedUser = await Employee.findByIdAndUpdate(id, data);
            const updatedUser = await Employee.findByIdAndUpdate(id, data, { new: true });

            console.log('Update User', updatedUser);

            resolve({
                status: 'OK',
                message: 'Cập nhật thông tin user thành công',
                data: updatedUser
            })

        } catch (e) {
            reject(e);
        }
    })
}

//deleteEmployee
const deleteEmployee = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Lấy ra 1 email 1phone
            const checkEmployee = await Employee.findOne({
                _id: id
            })
            console.log('Check User', checkEmployee);

            //Login : Kiem tra user khong ton tai 
            if (checkEmployee === null) {
                resolve({
                    status: 'ERR',
                    message: 'Nhân viên không tồn tại'
                })
            }

            // await checkEmployee.delete()
            checkEmployee.deleted_at = moment();
            await checkEmployee.save()
            
            resolve({
                status: 'OK',
                message: 'Xóa nhân viên thành công SUCCESS',

            })

        } catch (e) {
            reject(e);
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
                message: 'Lấy 1 nhân viên thành công SUCCESS',
                data: user
            })

        } catch (e) {
            reject(e);
        }
    })
}




module.exports = {
    createEmployee,
    loginEmployee,
    updateEmployee,
    getDetailsEmployee,
    deleteEmployee,
    getAllUser,

}
