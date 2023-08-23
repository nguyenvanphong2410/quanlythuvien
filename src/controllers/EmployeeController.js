const EmployeeService = require('../services/EmployeeServices')
const JwtServices = require('../services/JwtServices')
const Employee = require('../models/EmployeeModel')

const createUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        console.log(req.body);

        //Định dạng email
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);

        //Kí tự đặc biệt
        const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const isTrueName = specialChars.test(name)
        console.log(isTrueName);

        //Kiểm tra 
        if (!name || !email || !password || !phone) {
            console.log('111');
            //Kiểm tra tồn tại các giá trị
            return res.status(500).json({
                status: 'ERR',
                message: 'Một hoặc nhiều trường không tồn tại !'
            });
        } else if (!isCheckEmail) {
            console.log('222');
            //Kiểm tra định dạng email
            return res.status(500).json({
                status: 'ERR',
                message: 'Kiểm tra lại định dạng email !'
            });
        } else if (isTrueName) {
            console.log('333');
            //Kiểm tra Tên có chứa kí tự đặc biệt không
            return res.status(500).json({
                status: 'ERR',
                message: 'Tên không đúng hoặc chứa kí tự đặc biệt!'
            });
        }

        const response = await EmployeeService.createEmployee(req.body);
        return res.status(201).json(response);

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

const loginEmployee = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);

        if (!name || !email || !password || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            });
        }
        console.log('Kiểm tra định dạng email: ', isCheckEmail);

        const response = await EmployeeService.loginEmployee(req.body);
        return res.status(200).json(response);
    } catch (e) {
        // return res.status(404).json({
        return res.status(500).json({
            status: 'ERR',
            message: 'Đăng nhập thất bại !'
        })
    }
};

//Update User
const updateEmployee = async (req, res) => {
    try {
        //Nhận vào user id qua url
        const userId = req.params.id
        const { name, email, password, phone } = req.body;
        const data = req.body;
        console.log(data);

        //Định dạng email
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);

        //Kí tự đặc biệt
        const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const isTrueName = specialChars.test(name)
        const isTruePhone = specialChars.test(phone)

        //Kiem tra userId co hop le
        if (!userId) {
            console.log('111')
            return res.json({
                status: 'ERR',
                message: 'The userId is required(userId kh hợp lệ)'
            });
        }
        //Kiểm tra 
        if (!name || !email || !phone) {
            console.log('111');
            //Kiểm tra tồn tại các giá trị
            return res.json({
                status: 'ERR',
                message: 'Một hoặc nhiều trường không tồn tại !'
            });
        } else if (!isCheckEmail) {
            console.log('222');
            //Kiểm tra định dạng email
            return res.json({
                status: 'ERR',
                message: 'Kiểm tra lại định dạng email !'
            });
        } else if (isTrueName) {
            console.log('333');
            //Kiểm tra Tên có chứa kí tự đặc biệt không
            return res.json({
                status: 'ERR',
                message: 'Tên không đúng hoặc chứa kí tự đặc biệt!'
            });
        } else if (isTruePhone) {
            console.log('444');
            //Kiểm tra Phone có chứa kí tự đặc biệt không
            return res.json({
                status: 'ERR',
                message: 'Phone không đúng hoặc chứa kí tự đặc biệt!'
            });
        }

        console.log('ID của 1 user: ', userId);
        const response = await EmployeeService.updateEmployee(userId, data);
        console.log('222');

        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: 'updateEmployee Loi nha, co the la loi id '
        })
    }
};

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


//getDetailsEmployee
const getDetailsEmployee = async (req, res) => {
    try {
        const userId = req.params.id

        //Kiem tra userId co hop le
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required(userId kh hợp lệ)'
            });
        }

        console.log('ID của 1 user: ', userId);
        const response = await EmployeeService.getDetailsEmployee(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: ' getDetailsEmployee Loi nha, co the la loi id '
        })
    }
};

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
    loginEmployee,
    getAllUser,
    updateEmployee,
    getDetailsEmployee,
    // deleteUser,
    // refreshToken
}