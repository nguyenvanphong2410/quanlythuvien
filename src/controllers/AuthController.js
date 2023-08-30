const Employee = require('../models/EmployeeModel')
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require('./JwtServices');
const dotenv = require('dotenv');
const mongooseDelete = require('mongoose-delete');
const moment = require("moment");

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