const bcrypt = require("bcrypt");
const Books = require('../models/BookModel');
const Categories = require("../models/CategoryModel");
const moment = require("moment");
const { responseSuccess, responseError } = require('../utils/ResponseHandle');
const Authors = require("../models/AuthorModel");


//getAllUser User Service
const getAllBook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allBooks = await Books.find({ deleted_at: null }).populate({
                path: 'category_id',
                match: { deleted_at: null }
            });

            resolve({
                status: 'OK',
                message: 'Lấy ra toàn bộ sách thành công',
                data: allBooks
            });

        } catch (e) {
            reject(e);
        }
    });
}

//getDetailsEmployee
const getDetailsBook = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Lấy ra 1 email theo id
            const book = await Books.findOne({ _id: id })
                .populate({
                    path: 'category_id',
                    match: { deleted_at: null }
                })
                .populate({
                    path: 'author_ids',
                    match: { deleted_at: null }
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
const updateBook = (id, data, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await Books.findOne({ _id: id })

            if (checkUser === null) {
                return responseError(res, 400, 'not found', 'Sách này không tồn tại !!! ')
            }

            // Lấy danh sách tác giả ban đầu
            const initialAuthors = checkUser.author_ids;

            const updatedBook = await Books.findByIdAndUpdate(id, data, { new: true });

            // Lấy danh sách tác giả mới
            const updatedAuthors = updatedBook.author_ids;

            // Kiểm tra và cập nhật trường book_ids trong bảng Author
            const authorsToUpdate = updatedAuthors.filter(author => !initialAuthors.includes(author));

            await Promise.all(authorsToUpdate.map(async authorId => {
                const author = await Authors.findOne({ _id: authorId });
                if (author) {
                    author.book_ids.push(id);
                    await author.save();
                }
            }));

            console.log('Book User', updatedBook);

            return responseSuccess(res, {
                status: 'OK',
                message: 'Cập nhật sách thành công',
                data: updatedBook
            }, 200);

        } catch (e) {
            return responseError(res, 500, 'err', 'Tạo mới sách thất bại !!! ')
        }
    })
}

//deleteBook
const deleteBook = (id, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBook = await Books.findOne({ _id: id })

            if (checkBook === null) {
                return responseError(res, 400, 'not found', 'Không tồn tại sách này !!! ')
            }

            checkBook.deleted_at = moment();
            await checkBook.save()

            return responseSuccess(res, {
                message: `Xóa ${checkBook.name} thành công`,
            }, 200);

        } catch (e) {
            return responseError(res, 500, 'err', 'Xóa sách thất bại !!! ')
        }
    })
}

module.exports = {
    getAllBook,
    getDetailsBook,
    updateBook,
    deleteBook
}
