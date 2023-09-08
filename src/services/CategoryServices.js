const bcrypt = require("bcrypt");
const Category = require('../models/CategoryModel');
const moment = require("moment");

const createCategoriesBook = (newUser) => {
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
const getAllCategoriesBook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCategoies = await Category.find({deleted_at: null});

            resolve({
                status: 'OK',
                message: 'Lấy ra toàn bộ danh mục',
                data: allCategoies
            })

        } catch (e) {
            reject(e);
        }
    })
}

//getDetailsCategory
const getDetailsCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Lấy ra 1 email theo id
            const category = await Category.findOne({
                _id: id
            })

            if (category === null) {
                return reject.status(500).json({
                    status: 'Ok',
                    message: 'Thể loại này không tồn !'
                })
            }

            resolve({
                status: 'OK',
                message: 'Lấy ra 1 thể loại thành công SUCCESS',
                data: category
            })

        } catch (e) {
            reject(e);
        }
    })
}

//updateCategory
const updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({ _id: id })

            if (checkCategory === null) {
                return res.json({
                    status: 'ERR',
                    message: 'Thể loại sách không tồn tại!)'
                })
            }
            const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });

            console.log('Book User', updatedCategory);

            resolve({
                status: 'OK',
                message: 'Cập nhật thông tin thành công ',
                data: updatedCategory
            })

        } catch (e) {
            reject(e);
        }
    })
}

//deleteCategory
const deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Lấy ra 1 email 1phone
            const checkCategory = await Category.findOne({ _id: id })

            //Kiem tra tác giả khong ton tai 
            if (checkCategory === null) {
                resolve({
                    status: 'ERR',
                    message: 'Thể loại không tồn tại'
                })
            }

            // await checkCategory delte
            checkCategory.deleted_at = moment();
            await checkCategory.save()

            resolve({
                status: 'OK',
                message: 'Xóa tác thể loại thành công',

            })

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createCategoriesBook,
    getAllCategoriesBook,
    getDetailsCategory,
    updateCategory,
    deleteCategory,
}
