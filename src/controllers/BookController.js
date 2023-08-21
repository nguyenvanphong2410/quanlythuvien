const BookServices = require('../services/BookServices')
const Book = require('../models/BookModel')

const createBook = async (req, res) => {
    try {
        const { name, year_creation, description, content, total, stock } = req.body;
        console.log(req.body);
        const createdBook = await Book.create({
            name,
            year_creation,
            description,
            content,
            total,
            stock
        })
        if (createdBook) {
            console.log('Tạo mới sách thành công ');
            return res.status(201).json({
                status: 'OK',
                message: 'Tạo mới sách thành công',
                data: createdBook
            });
        }
        

    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi tạo mới sách!'
        })
    }
};

//getAllBook
const getAllBook = async (req, res) => {
    try {
        const response = await BookServices.getAllBook();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: 'getAllBook: Lỗi'
        })
    }
};



module.exports = {
    createBook,
    getAllBook,
}