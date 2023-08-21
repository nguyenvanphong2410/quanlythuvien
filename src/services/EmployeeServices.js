const Employee = require('../models/EmployeeModel')
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require('./JwtServices');
const dotenv = require('dotenv');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser;
        try {
            
            // //Lấy ra 1 email 1phone
            // const checkUser = await User.findOne({ email: email })
            // const checkPhone = await User.findOne({ phone: phone })
            
            // //Kiem tra email da ton tai trong db
            // if (checkUser !== null) {
                //     resolve({
                    //         status: 'Ok',
            //         message: 'The email is already(Email này đã tồn tại)'
            //     })
            // }
            
            // //Kiem tra Phone da ton tai trong db
            // if ((checkPhone !== null)) {
                //     resolve({
                    //         status: 'Ok',
                    //         message: 'The Phone is already(Phone này đã tồn tại)'
                    //     })
                    // }
                    
                    // //Mã hóa pass
                    // const hash = bcrypt.hashSync(password, 10);
                    // console.log('hash', hash);
                    
                    // const createdUser = await User.create({
                        //     name,
                        //     email,
                        //     password: hash,
                        //     phone
                        // })
                        
                        
                        // const createdUser = await User.create({
            //     name,
            //     email,
            //     password,
            //     phone
            // })
            // if (createdUser) {
            //     resolve({
                //         status: 'OK',
            //         message: 'Tạo ng dùng thành công SUCCESS',
            //         data: createdUser
            //     })
            // }
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
    createUser,
    // loginUser,
    // updateUser,
    // deleteUser,
    getAllUser,
    // getDetailsUser,

}
