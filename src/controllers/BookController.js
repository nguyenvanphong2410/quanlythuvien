const BookServices = require('../services/BookServices')
const Book = require('../models/BookModel');
const Books = require('../models/BookModel');
const Authors = require('../models/AuthorModel');
const { responseSuccess, responseError } = require('../utils/ResponseHandle');

const createBook = async (req, res) => {
    try {

        const { name, year_creation, description, content, total, stock, category_id, author_ids } = req.body;
        console.log(req.body);

        // Chuyển đổi total và stock sang số nguyên
        const totalInt = parseInt(total, 10);
        const stockInt = parseInt(stock, 10);

        //Kí tự đặc biệt
        const specialChars = /[$%^&*_\[\]{}\\|<>\/]+/;;
        const specialCharsContent = /[$%^&*_\[\]{}|]+/;
        const isTrueName = specialChars.test(name)
        const isTrueDescription = specialChars.test(description)
        const isTrueContent = specialCharsContent.test(content)

        if (!name || !year_creation || !description || !content || !total || !stock || !category_id || !author_ids) {
            return responseError(res, 400, 'null', 'Thông tin trống !!! ')
        } else if (isTrueName) {
            return responseError(res, 400, 'name', 'Tên không hợp lệ !!! ')
        } else if (isTrueDescription) {
            return responseError(res, 400, 'description', 'Mô tả không hợp lệ !!! ')
        } else if (isTrueContent) {
            return responseError(res, 400, 'content', 'Nội dung không hợp lệ !!! ')
        } else if (total < 0) {
            return responseError(res, 400, 'total', 'Tổng số không hợp lệ !!!')
        }
        else if (stock < 0) {
            return responseError(res, 400, 'stock', 'Số lượng tồn không hợp lệ !!!')
        }

        const createdBook = await Book.create({
            name,
            year_creation,
            description,
            content,
            total: totalInt,
            stock: stockInt,
            category_id,
            author_ids
        })

        // Tìm tác giả thuộc author_ids
        const authorIds = createdBook.author_ids;

        authorIds.map(async (item) => {
            console.log('Id tac gia: ', item);
            //Lấy ra 1 email theo id
            const authorOfBook = await Authors.findOne({ _id: item })
            if (authorOfBook) {
                await authorOfBook.book_ids.push(createdBook._id);
                await authorOfBook.save();
            }
        })

        if (createdBook) {
            console.log('Tạo mới sách thành công ');
            return responseSuccess(res, {
                status: 'OK',
                message: 'Tạo mới sách thành công',
                data: createdBook
            }, 200);
        }
    } catch (e) {
        return responseError(res, 500, 'err', 'Tạo mới sách thất bại !!! ')

    }
};

//getAllBook
const getAllBook = async (req, res) => {
    try {
        const response = await BookServices.getAllBook(res);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: 'Lỗi lấy ra sách'
        })
    }
};

//getDetailsBook
const getDetailsBook = async (req, res) => {
    try {
        const bookId = req.params.id

        //Kiem tra userId co hop le
        if (!bookId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Sách không tồn tại!'
            });
        }

        console.log('BookDeatails ID : ', bookId);
        const response = await BookServices.getDetailsBook(bookId, res);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: 'Lỗi lấy ra 1 sách! '
        })
    }
};

//Update User
const updateBook = async (req, res) => {
    try {
        //Nhận vào user id qua url
        const bookId = req.params.id
        const { name, year_creation, description, content, total, stock } = req.body;
        const data = req.body;
        console.log(data);

        //Kí tự đặc biệt
        const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const specialCharsContent = /[$%^&*_\[\]{}|]+/;
        const isTrueName = specialChars.test(name)
        const isTrueTotal = specialChars.test(total)
        const isTrueStock = specialChars.test(stock)
        const isTrueDescription = specialChars.test(description)
        const isTrueContent = specialCharsContent.test(content)

        //Kiem tra bookId co hop le
        if (!bookId) {
            return responseError(res, 400, 'not found', 'Sách này không tồn tại !!! ')
        }

        //Kiểm tra 
        if (!name || !year_creation || !description || !content || !total || !stock) {
            return responseError(res, 400, 'null', 'Thông tin trống !!! ')
        } else if (isTrueName) {
            return responseError(res, 400, 'name', 'Tên sách không hợp lệ !!! ')
        } else if (isTrueDescription) {
            return responseError(res, 400, 'description', 'Mô tả không hợp lệ !!! ')
        } else if (isTrueContent) {
            return responseError(res, 400, 'content', 'Nội dung không hợp lệ !!! ')
        } else if (isTrueTotal || total < 0) {
            return responseError(res, 400, 'total', 'Tổng số lượng không hợp lệ !!! ')
        } else if (isTrueStock || stock < 0) {
            return responseError(res, 400, 'stock', 'Số lượng tồn không hợp lệ !!! ')
        }

        console.log('ID của 1 user: ', bookId);
        const response = await BookServices.updateBook(bookId, data, res);

        return res.status(200).json(response);
    } catch (e) {
        return responseError(res, 500, 'err', 'Cập nhật thất bại !!! ')
    }
};

//deleteBook
const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id

        if (!bookId) {
            return responseError(res, 400, 'not found', 'Không tồn tại sách này !!! ')
        }

        const response = await BookServices.deleteBook(bookId,res);
        return res.status(200).json(response);
    } catch (e) {
        return responseError(res, 500, 'err', 'Xóa sách thất bại !!! ')
    }
};

module.exports = {
    createBook,
    getAllBook,
    getDetailsBook,
    updateBook,
    deleteBook,
}