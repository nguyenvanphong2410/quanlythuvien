const bcrypt = require("bcrypt");
const Books = require('../models/BookModel');

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
const getAllBook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allBooks = await Books.find();
            
            resolve({
                status: 'OK',
                message: 'Lấy ra toàn bộ sách thành công',
                data: allBooks
            })

        } catch (e) {
            reject(e);
        }
    })
}

//getDetailsEmployee
const getDetailsBook = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Lấy ra 1 email theo id
            const book = await Books.findOne({
                _id: id
            })

            //Login : Kiem tra user khong ton tai 
            if (book === null) {
                return reject.status(500).json({
                    status: 'Ok',
                    message: 'The book is not defined(book này không tồn tại trong db)'
                })
            }

            resolve({
                status: 'OK',
                message: 'Lấy ra thông thi của 1 book thành công SUCCESS',
                data: book
            })

        } catch (e) {
            reject(e);
        }
    })
}

//Update User Service
const updateBook = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await Books.findOne({ _id: id })

            if (checkUser === null) {
                //Kiem tra user khong ton tai 
                return res.json({
                    status: 'ERR',
                    message: 'Sách này không tồn tại !)'
                })
            } 
            const updatedBook = await Books.findByIdAndUpdate(id, data, { new: true });

            console.log('Book User', updatedBook);

            resolve({
                status: 'OK',
                message: 'Cập nhật thông tin user thành công SUCCESS',
                data: updatedBook
            })

        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createUser,
    getAllBook,
    getDetailsBook,
    updateBook,
}
