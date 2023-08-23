const bcrypt = require("bcrypt");
const Author = require('../models/AuthorModel');

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

//getAllUser 
const getAllAuthor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allAuthor = await Author.find();
            
            resolve({
                status: 'OK',
                message: 'Lấy ra toàn bộ tác giả thành công',
                data: allAuthor
            })

        } catch (e) {
            reject(e);
        }
    })
}

//getDetailsAuthor
const getDetailsAuthor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Lấy ra 1 tác giả theo id
            const author = await Author.findOne({
                _id: id
            })

            //Kiem tra tác giả khong ton tai 
            if (author === null) {
                return reject.status(500).json({
                    status: 'Ok',
                    message: 'Tác giả này không tồn tại !'
                })
            }

            resolve({
                status: 'OK',
                message: 'Lấy ra thông tin của 1 tác giả thành công SUCCESS',
                data: author
            })

        } catch (e) {
            reject(e);
        }
    })
}

//updateAuthor
const updateAuthor = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await Author.findOne({ _id: id })

            if (checkUser === null) {
                //Kiem tra tác giả khong ton tai 
                return res.json({
                    status: 'ERR',
                    message: 'Tác giả này không tồn tại !)'
                })
            } 
            const updatedAuthor = await Author.findByIdAndUpdate(id, data, { new: true });

            console.log('Book User', updatedAuthor);

            resolve({
                status: 'OK',
                message: 'Cập nhật thông tin tác gia thành công SUCCESS',
                data: updatedAuthor
            })

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createUser,
    getAllAuthor,
    getDetailsAuthor,
    updateAuthor,
}
