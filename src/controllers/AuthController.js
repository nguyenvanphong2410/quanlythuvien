const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");
const Employee = require('../models//EmployeeModel')
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require('../services/JwtServices');
const cookieParser = require('cookie-parser');
const { comparePassword } = require('../helpers/index');
const { responseSuccess, responseError } = require('../utils/ResponseHandle');

const loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);
        // console.log('hihi')

        if (!email || !password) {
            return responseError(res, 400, 'not found', 'Không tìm thấy email pasword !!!')

        } else if (!isCheckEmail) {
            return responseError(res, 400, 'email', 'Email này không hợp lệ !!! ')
        }

        //Lấy ra 1 email 1phone
        const checkUser = await Employee.findOne({ email: email })
        if (checkUser === null) {
            return responseError(res, 400, 'email', 'Email này không tồn tại !!! ')
        }

        //So sánh mật khẩu
        const verified = await comparePassword(password, checkUser.password)
        if (!verified) {
            return responseError(res, 400, 'password', 'Mật khẩu sai !!! ')
        }

        if (checkUser.status === '1') {
            return responseError(res, 400, 'lock', 'Tài khoản bị khóa !!! ')
        }

        //Tao token
        var token = jwt.sign({ email: checkUser.email }, 'access_token', {
            expiresIn: '24h'
        });

        res.cookie('token', token, 86400000);

        return responseSuccess(res, { 'token': token, 'expire_in': 86400000, 'auth_type': 'Bearer Token' }, 200)

    } catch (error) {
        console.log(error)
        return responseError(res, 500, 'err', 'Server Error')
    }

};
// //refreshToken
// const refreshToken = async (req, res) => {
//     try {
//         const token = req.headers.token.split(' ')[1];
//         const userId = req.params.id

//         //Kiem tra userId co hop le
//         if (!token) {
//             return responseError(res, 400, 'Token không hợp lệ !!! ')
//         }

//         const response = await JwtServices.refreshTokenJwtService(token);
//         return responseSuccess(res, response , 200);
//     } catch (e) {
//         return responseError(res, 500, 'Lỗi refresh token !!! ')
//     }
// };

const logoutEmployee = async (req, res) => {
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        console.log('token la: ', token);
        token = token.replace(/^Bearer\s+/, "");
        console.log('token', token)
        if (token) {
            const tokenCacheExpire = new NodeCache();
            const decoded = jwt.decode(token);
            console.log('decoded', decoded)

            const expiresIn = decoded.exp;
            tokenCacheExpire.set(token, token, expiresIn)
        }

        return responseSuccess(res, 'OKKK')

    } catch (error) {
        console.log(error)
        return responseError(res, 500, 'err', 'Server Error Logout')
    }
};

module.exports = {
    loginEmployee,
    // refreshToken,
    logoutEmployee,
}