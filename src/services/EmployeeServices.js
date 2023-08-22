const Employee = require('../models/EmployeeModel')
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require('./JwtServices');
const dotenv = require('dotenv');

const createEmployee = (newEmployee) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newEmployee;
        console.log('newEmployee:',newEmployee);
        try {

            //Lấy ra 1 email 1phone
            const checkUser = await Employee.findOne({ email: email })
            const checkPhone = await Employee.findOne({ phone: phone })

            //Kiem tra email da ton tai trong db
            if (checkUser !== null) {
                resolve({
                    status: 'Ok',
                    message: 'Email này đã tồn tại'
                })
            } else if ((checkPhone)) {
                //Kiem tra Phone da ton tai trong db
                resolve({
                    status: 'Ok',
                    message: 'Phone này đã tồn tại'
                })
                return ;
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
                resolve({
                    status: 'OK',
                    message: 'Tạo ng dùng thành công SUCCESS',
                    data: createdEmployee
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
            const allUser = await Employee.find();

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
// const loginUser = (userLogin) => {
//     return new Promise(async (resolve, reject) => {
//         const { name, email, password, confirmPassword, phone } = userLogin;
//         try {
//             //Lấy ra 1 email 1phone
//             const checkUser = await User.findOne({ email: email })

//             //Login : Kiem tra email khong ton tai 
//             if (checkUser === null) {
//                 resolve({
//                     status: 'Ok',
//                     message: 'The email is not defined(Email này không tồn tại trong db)'
//                 })
//             }

//             //so sanh password dưa vài
//             const comparePassword = bcrypt.compareSync(password, checkUser.password);
//             // console.log('So sánh password: ', comparePassword);

//             //Kiểm tra password sai
//             if (!comparePassword) {
//                 resolve({
//                     status: 'Ok',
//                     message: 'The password or user is incorrect(Mk hoặc ngdg không chính xác)'
//                 })
//             }

//             //Sau khi logi thanh cong lấy token
//             const access_token = await genneralAccessToken({
//                 //truyền payload vào 
//                 id: checkUser.id,
//                 isAdmin: checkUser.isAdmin
//             })

//             //Trả về refresh token
//             const refresh_token = await genneralRefreshToken({
//                 id: checkUser.id,
//                 isAdmin: checkUser.isAdmin
//             })

//             console.log('>> Trả về access_token', access_token);

//             resolve({
//                 status: 'OK',
//                 message: 'Đăng nhập thành công SUCCESS',
//                 access_token,
//                 refresh_token
//             })

//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// //Update User Service
// const updateUser = (id, data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             //Lấy ra 1 email 1phone
//             const checkUser = await User.findOne({
//                 _id: id
//             })
//             console.log('Check User', checkUser);

//             //Login : Kiem tra user khong ton tai 
//             if (checkUser === null) {
//                 resolve({
//                     status: 'Ok',
//                     message: 'The user is not defined(User này không tồn tại trong db)'
//                 })
//             }

//             const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
//             console.log('Update User', updatedUser);

//             resolve({
//                 status: 'OK',
//                 message: 'Cập nhật thông tin user thành công SUCCESS',
//                 data: updatedUser
//             })

//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// //deleteUser User Service
// const deleteUser = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             //Lấy ra 1 email 1phone
//             const checkUser = await User.findOne({
//                 _id: id
//             })
//             console.log('Check User', checkUser);

//             //Login : Kiem tra user khong ton tai 
//             if (checkUser === null) {
//                 resolve({
//                     status: 'Ok',
//                     message: 'The user is not defined(User này không tồn tại trong db)'
//                 })
//             }

//             await User.findByIdAndDelete(id)

//             resolve({
//                 status: 'OK',
//                 message: 'Xóa user thành công SUCCESS',

//             })

//         } catch (e) {
//             reject(e);
//         }
//     })
// }


// //getDetailsUser User Service
// const getDetailsUser = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             //Lấy ra 1 email theo id
//             const user = await User.findOne({
//                 _id: id
//             })

//             //Login : Kiem tra user khong ton tai 
//             if (user === null) {
//                 resolve({
//                     status: 'Ok',
//                     message: 'The user is not defined(User này không tồn tại trong db)'
//                 })
//             }

//             resolve({
//                 status: 'OK',
//                 message: 'Lấy ra thông thi của 1 user thành công SUCCESS',
//                 data: user
//             })

//         } catch (e) {
//             reject(e);
//         }
//     })
// }




module.exports = {
    createEmployee,
    // loginUser,
    // updateUser,
    // deleteUser,
    getAllUser,
    // getDetailsUser,

}
