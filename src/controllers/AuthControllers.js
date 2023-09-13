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
        var token = jwt.sign({
            id: checkUser.id,
            email: checkUser.email,
            name: checkUser.name,
        }, 'access_token', {
            expiresIn: '24h'
        });

        res.cookie('token', token, 86400000);

        return responseSuccess(res, { 'token': token, 'expire_in': 86400000, 'auth_type': 'Bearer Token' }, 200)

    } catch (error) {
        // logger.error({
        //     message: "Error login",
        //     detail: error
        // });
        console.log(error)
        return responseError(res, 500, 'err', 'Server Error')
    }
}

const logoutEmployee = async (req, res) => {
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        token = token.replace(/^Bearer\s+/, "");

        if (token) {
            const decoded = jwt.decode(token);
            const expiresIn = decoded.exp;
            tokenCacheExpire.set(token, token, expiresIn)
        }

        return responseSuccess(res, 'OK')

    } catch (error) {
        logger.error({
            message: "Error logout",
            detail: error
        });
        return responseError(res, 500, 'err','Server Error')
    }
}


module.exports = {
    loginEmployee,
    // refreshToken,
    logoutEmployee,
}