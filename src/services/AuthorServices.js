const bcrypt = require("bcrypt");
const Author = require('../models/AuthorModel');
const moment = require("moment");
const { responseSuccess, responseError } = require('../utils/ResponseHandle');


//getAllUser 
const getAllAuthor = (res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allAuthor = await Author.find({ deleted_at: null })

            resolve({
                status: 'OK',
                message: 'Lấy ra toàn bộ tác giả thành công',
                data: allAuthor
            })


        } catch (e) {
            return responseError(res, 500, 'err', 'Lấy ra toàn bộ tác giả thất bại !!! ')
        }
    })
}

//getDetailsAuthor
const getDetailsAuthor = (id, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Lấy ra 1 tác giả theo id
            const author = await Author.findOne({ _id: id })
                .populate({
                    path: 'book_ids',
                    match: { deleted_at: null }
                });

            //Kiem tra tác giả khong ton tai 
            if (author === null) {
                return responseError(res, 400, 'not found', 'Tác giả này không tồn tại !!! ')
            }

            resolve({
                status: 'OK',
                message: 'Lấy ra thông tin của 1 tác giả thành công ',
                data: author
            })

        } catch (e) {
            return responseError(res, 500, 'err', 'Lấy ra thông tin của 1 tác giả thất bại !!! ')
        }
    })
}

//updateAuthor
const updateAuthor = (id, data, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await Author.findOne({ _id: id })

            if (checkUser === null) {
                return responseError(res, 400, 'not found', 'Tác giả này không tồn tại !!! ')
            }
            const updatedAuthor = await Author.findByIdAndUpdate(id, data, { new: true });

            console.log('Book User', updatedAuthor);

            return responseSuccess(res, {
                status: 'OK',
                message: 'Cập nhật thông tin thành công',
                data: updatedAuthor
            }, 200);

        } catch (e) {
            console.log(e)
            return responseError(res, 500, 'err', 'Cập nhật tác giả thất bại !!! ')
        }
    })
};

//deleteAuthor
const deleteAuthor = (id, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Lấy ra 1 email 1phone
            const checkAuthor = await Author.findOne({ _id: id })

            if (checkAuthor === null) {
                return responseError(res, 400, 'not found', 'Tác giả này không tồn tại !!! ')
            }

            checkAuthor.deleted_at = moment();
            await checkAuthor.save()

            return responseSuccess(res, {
                message: `Xóa ${checkAuthor.name} thành công`,
            }, 200);

        } catch (e) {
            return responseError(res, 500, 'err', 'Xóa tác giả thất bại !!! ')
        }
    })
}

module.exports = {
    getAllAuthor,
    getDetailsAuthor,
    updateAuthor,
    deleteAuthor
}
