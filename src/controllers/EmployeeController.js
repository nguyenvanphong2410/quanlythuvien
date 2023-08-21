const EmployeeService = require('../services/EmployeeServices')
const JwtServices = require('../services/JwtServices')
const Employee = require('../models/EmployeeModel')

const createUser = async (req, res) => {
    try {
        const status = 0
        const { name, email, password, phone } = req.body;
        console.log(req.body);
        const createdUser = await Employee.create({
            email,
            name,
            password,
            phone,
            status,
        })
        if (createdUser) {
            console.log('Tạo người dùng thành công ');
            return res.status(201).json({
                status: 'OK',
                message: 'Tạo người dùng thành công',
                data: createdUser
            });

        }

    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi tạo người dùng !'
        })
    }
};

//getAllUser User
const getAllUser = async (req, res) => {
    try {

        const response = await EmployeeService.getAllUser();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: 'getAllUser: Lỗi'
        })
    }
};

// const loginUser = async (req, res) => {
//     try {
//         const { name, email, password, confirmPassword, phone } = req.body;
//         const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
//         const isCheckEmail = reg.test(email);

//         if (!name || !email || !password || !confirmPassword || !phone) {
//             return res.status(200).join({
//                 status: 'ERR',
//                 message: 'The input is required'
//             });
//         } else if (!isCheckEmail) {
//             return res.status(200).join({
//                 status: 'ERR',
//                 message: 'The input is email'
//             });
//         } else if (password !== confirmPassword) {
//             return res.status(200).join({
//                 status: 'ERR',
//                 message: 'The password is equal confirmPassword'
//             });
//         }

//         console.log('Kiểm tra định dạng email: ', isCheckEmail);

//         const response = await UserService.loginUser(req.body);
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// };

// //Update User
// const updateUser = async (req, res) => {
//     try {
//         //Nhận vào user id qua url
//         const userId = req.params.id

//         //Kiem tra userId co hop le
//         if (!userId) {
//             return res.status(200).join({
//                 status: 'ERR',
//                 message: 'The userId is required(userId kh hợp lệ)'
//             });
//         }

//         console.log('ID của 1 user: ', userId);
//         const response = await UserService.updateUser(userId, data);
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(404).json({
//             message: 'Loi nha, co the la loi id '
//         })
//     }
// };

// //Delete User
// const deleteUser = async (req, res) => {
//     try {
//         const userId = req.params.id
//         const token = req.headers

//         //Kiem tra userId co hop le
//         if (!userId) {
//             return res.status(200).join({
//                 status: 'ERR',
//                 message: 'The userId is required(userId kh hợp lệ)'
//             });
//         }

//         console.log('ID của 1 user: ', userId);
//         const response = await UserService.deleteUser(userId);
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(404).json({
//             message: 'Loi nha, co the la loi id '
//         })
//     }
// };


// //getDetailsUser
// const getDetailsUser = async (req, res) => {
//     try {
//         const userId = req.params.id
//         const token = req.headers

//         //Kiem tra userId co hop le
//         if (!userId) {
//             return res.status(200).join({
//                 status: 'ERR',
//                 message: 'The userId is required(userId kh hợp lệ)'
//             });
//         }

//         console.log('ID của 1 user: ', userId);
//         const response = await UserService.getDetailsUser(userId);
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(404).json({
//             message: ' getDetailsUser Loi nha, co the la loi id '
//         })
//     }
// };

// //refreshToken
// const refreshToken = async (req, res) => {
//     try {
//         const token = req.headers.token.split(' ')[1];
//         const userId = req.params.id

//         //Kiem tra userId co hop le
//         if (!token) {
//             return res.status(200).join({
//                 status: 'ERR',
//                 message: 'The token is required(token kh hợp lệ)'
//             });
//         }

//         console.log('ID của 1 user: ', userId);
//         const response = await JwtServices.refreshTokenJwtService(token);
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(404).json({
//             message: ' getDetailsUser Loi nha, co the la loi id '
//         })
//     }
// };

module.exports = {
    createUser,
    // loginUser,
    // updateUser,
    // deleteUser,
    getAllUser,
    // getDetailsUser,
    // refreshToken
}