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
            return responseError(res, 400, 'Không tìm thấy email pasword !!!')

        } else if (!isCheckEmail) {
            return responseError(res, 400, 'Email này không hợp lệ !!! ')
        }

        //Lấy ra 1 email 1phone
        const checkUser = await Employee.findOne({ email: email })
        if (checkUser === null) {
            return responseError(res, 400, 'Email này không tồn tại !!! ')
        }

        //So sánh mật khẩu
        const verified = await comparePassword(password, checkUser.password)
        if (!verified) {
            return responseError(res, 400, 'Mật khẩu sai !!! ')
        }

        if (checkUser.status === '1') {
            return responseError(res, 400, 'Tài khoản bị khóa !!! ')
        }

        //Sau khi login thanh cong lấy token
        const access_token = await genneralAccessToken({
            //truyền payload vào 
            id: checkUser.id,
            email: checkUser.email,
            name: checkUser.name,
        })

        //Trả về refresh token
        const refresh_token = await genneralRefreshToken({ id: checkUser.id })
        responseSuccess(res, {
            status: 'OK',
            message: 'Đăng nhập thành công $',
            access_token,
            refresh_token
        }, 200);


    } catch (e) {
        return responseError(res, 500, 'Đăng nhập thất bại !!! ')
    }

};
//refreshToken
const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1];
        const userId = req.params.id

        //Kiem tra userId co hop le
        if (!token) {
            return responseError(res, 400, 'Token không hợp lệ !!! ')
        }

        const response = await JwtServices.refreshTokenJwtService(token);
        return responseSuccess(res, response , 200);
    } catch (e) {
        return responseError(res, 500, 'Lỗi refresh token !!! ')
    }
};

const logoutEmployee = async (req, res) => {
    try {
        res.clearCookie("access_token");
        return responseSuccess(res, {
            status: 'OK',
            message: 'Đăng xuất thành công !'
        } , 200);

    } catch (error) {
        return responseError(res, 500, 'Đăng xuất thất bại !!! ')
    }
};

module.exports = {
    loginEmployee,
    refreshToken,
    logoutEmployee,
}