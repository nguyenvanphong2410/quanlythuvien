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

//getAllUser User Service
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

module.exports = {
    createUser,
    getAllAuthor,
}
