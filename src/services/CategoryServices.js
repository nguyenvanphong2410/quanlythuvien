const bcrypt = require("bcrypt");
const Category = require('../models/CategoryModel');
const moment = require("moment");
const { responseSuccess, responseError } = require('../utils/ResponseHandle');


//getAllCategoriesBook
const getAllCategoriesBook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCategoies = await Category.find({ deleted_at: null });

            resolve({
                status: 'OK',
                message: 'Lấy ra toàn bộ danh mục',
                data: allCategoies
            })

        } catch (e) {
            return responseError(res, 500, 'err', 'Lấy ra toàn bộ thể loại sách thất bại !!! ')
        }
    })
}

//getDetailsCategory
const getDetailsCategory = (id, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Lấy ra 1 email theo id
            const category = await Category.findOne({ _id: id })

            if (category === null) {
                return reject.status(500).json({
                    status: 'Ok',
                    message: 'Thể loại này không tồn !'
                })
            }

            resolve({
                status: 'OK',
                message: 'Lấy ra 1 thể loại thành công ',
                data: category
            })

        } catch (e) {
            return responseError(res, 500, 'err', 'Lấy ra thông tin của 1 thể loại sách thất bại !!! ')
        }
    })
}

//updateCategory
const updateCategory = (id, data, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({ _id: id })

            if (checkCategory === null) {
                return responseError(res, 400, 'not found', 'Thể loại sách này không tồn tại !!! ')
            }
            const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });

            console.log('Book User', updatedCategory);

            return responseSuccess(res, { 
                status: 'OK',
                message: 'Cập nhật thông tin thành công',
                data: updatedCategory
            }, 200);

        } catch (e) {
            return responseError(res, 500, 'err','Cập nhật thể loại sách thất bại !!! ')
        }
    })
}

//deleteCategory
const deleteCategory = (id, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({ _id: id })

            if (checkCategory === null) {
                return responseError(res, 400, 'not found', 'Không tồn tại thể loại sách này !!! ')
            }

            checkCategory.deleted_at = moment();
            await checkCategory.save()

            return responseSuccess(res, {
                message: `Xóa ${checkCategory.name} thành công`,
            }, 200);

        } catch (e) {
            console.log('loi nay nha ', e)
            return responseError(res, 500, 'err','Xóa thể loại sách thất bại !!! ')
        }
    })
}

module.exports = {
    getAllCategoriesBook,
    getDetailsCategory,
    updateCategory,
    deleteCategory,
}
