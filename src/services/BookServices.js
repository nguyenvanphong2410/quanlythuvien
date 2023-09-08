const bcrypt = require("bcrypt");
const Books = require('../models/BookModel');
const Categories = require("../models/CategoryModel");
const moment = require("moment");


//getAllUser User Service
const getAllBook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allBooks = await Books.find({ deleted_at: null }).populate('category_id');

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
            const book = await Books.findOne({ _id: id })
                .populate('category_id')
                .populate('author_ids');

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
                return res.json({
                    status: 'ERR',
                    message: 'Sách này không tồn tại !)'
                })
            }
            const updatedBook = await Books.findByIdAndUpdate(id, data, { new: true });

            console.log('Book User', updatedBook);

            resolve({
                status: 'OK',
                message: 'Cập nhật thông tin thành công ',
                data: updatedBook
            })

        } catch (e) {
            reject(e);
        }
    })
}

//deleteBook
const deleteBook = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBook = await Books.findOne({_id: id})

            //Kiem tra sách khong ton tai 
            if (checkBook === null) {
                resolve({
                    status: 'ERR',
                    message: 'Sách không tồn tại'
                })
            }

            //delete
            checkBook.deleted_at = moment();
            await checkBook.save()

            resolve({
                status: 'OK',
                message: 'Xóa sách thành công',
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    // createUser,
    getAllBook,
    getDetailsBook,
    updateBook,
    deleteBook
}
