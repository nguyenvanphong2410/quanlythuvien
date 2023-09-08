const Employee = require('../models//EmployeeModel')
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require('../services/JwtServices');
const cookieParser = require('cookie-parser');
const {comparePassword} = require('../helpers/index');

const loginEmployee = async (req, res) => {
    try {

        const { email, password } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password) {
            return res.json({
                status: 'ERR',
                message: 'Vui lòng điền đủ thông tin !'
            });
        } else if (!isCheckEmail) {
            return res.json({
                status: 'ERR',
                message: 'Email không hợp lệ ! !'
            });
        }
        console.log('Kiểm tra định dạng email: ', isCheckEmail);

        //Lấy ra 1 email 1phone
        const checkUser = await Employee.findOne({ email: email })

        //Login : Kiem tra email khong ton tai 
        if (checkUser === null) {
            return res.json({
                status: 'ERR',
                message: 'Email này không tồn tại!'
            })
        }

        //So sánh mật khẩu
        let verified = await comparePassword(password, checkUser.password)

        if (!verified) {
            return res.json({
                status: 'ERR',
                message: 'Mật khẩu sai !'
            })
        }

        // Kiểm tra trạng thái của người dùng
        if (checkUser.status === '1') {
            return res.json({
                status: 'ERR',
                message: 'Tài khoản bị khóa !'
            });
        }

        //Sau khi login thanh cong lấy token
        const access_token = await genneralAccessToken({
            //truyền payload vào 
            id: checkUser.id,
            email: checkUser.email,
            name: checkUser.name,

        })

        //Trả về refresh token
        const refresh_token = await genneralRefreshToken({
            id: checkUser.id,

        })

        console.log('>> Trả về access_token', access_token);

        res.json({
            status: 'OK',
            message: 'Đăng nhập thành công SUCCESS',
            access_token,
            refresh_token
        })

        // Lấy giá trị của cookie
        const access_token1 = req.cookies.access_token

        // Xử lý logic tùy thuộc vào giá trị của cookie
        if (access_token1) {
            return console.log('Giá trị của access_token:', access_token1);
        } else {
            return console.log('Cookie không tồn tại');
        }


    } catch (e) {
        // return res.status(404).json({
        return res.json({
            status: 'ERR',
            message: 'Đăng nhập thất bại !'
        })
    }

};
//refreshToken
const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1];
        const userId = req.params.id

        //Kiem tra userId co hop le
        if (!token) {
            return res.status(200).join({
                status: 'ERR',
                message: 'Token kh hợp lệ)'
            });
        }

        console.log('ID của 1 user: ', userId);
        const response = await JwtServices.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: ' getDetailsUser Loi nha, co the la loi id '
        })
    }
};

const logoutEmployee = async (req, res) => {
    try {
        res.clearCookie("access_token");
        return res.json({
            status: 'OK',
            message: 'Đăng xuất thành công !'
        })
    } catch (error) {
        logger.error({
            message: "Error logout",
            detail: error
        });
        return res.json({
            status: 'ERR',
            message: 'Đăng xuất thất bại !'
        })
    }
};

module.exports = {
    loginEmployee,
    refreshToken,
    logoutEmployee,
}