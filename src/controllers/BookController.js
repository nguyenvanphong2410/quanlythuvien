const BookServices = require('../services/BookServices')
const Book = require('../models/BookModel')

const createBook = async (req, res) => {
    try {

        const { name, year_creation, description, content, total, stock , category_id} = req.body;
        console.log(req.body);

        // Chuyển đổi total và stock sang số nguyên
        const totalInt = parseInt(total, 10);
        const stockInt = parseInt(stock, 10);

        //Kí tự đặc biệt
        const specialChars = /[$%^&*_\[\]{}\\|<>\/]+/;;
        const isTrueName = specialChars.test(name)
        const isTrueDescription = specialChars.test(description)
        const isTrueContent = specialChars.test(content)

        if (!name || !year_creation || !description || !content || !total || !stock || !category_id) {
            //Kiểm tra tồn tại các giá trị
            return res.json({
                status: 'ERR',
                message: 'Một hoặc nhiều trường không tồn tại !'
            });
        } else if (isTrueName) {
            //Kiểm tra Tên có chứa kí tự đặc biệt không ?
            return res.json({
                status: 'ERR',
                message: 'Tên không hợp lệ!'
            });
        } else if (isTrueDescription) {
            //Kiểm tra Mô tả có chứa kí tự đặc biệt không ?
            return res.json({
                status: 'ERR',
                message: 'Mô tả không hợp lệ!'
            });
        } else if (isTrueContent) {
            //Kiểm tra Nội dung có chứa kí tự đặc biệt không ?
            return res.json({
                status: 'ERR',
                message: 'Nội dung không hợp lệ!'
            });
        }
        else if (total < 0 || stock < 0) {
            // Kiểm tra total và stock có phải là số âm ?
            return res.json({
                status: 'ERR',
                message: 'Bạn không được để số âm !'
            });
        }

        const createdBook = await Book.create({
            name,
            year_creation,
            description,
            content,
            total: totalInt, // Sử dụng giá trị số nguyên đã chuyển đổi
            stock: stockInt,
            category_id
        })
        if (createdBook) {
            console.log('Tạo mới sách thành công ');
            res.json({
                status: 'OK',
                message: 'Tạo mới sách thành công',
                data: createdBook
            });
        }
    } catch (e) {
        return res.json({
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

//getDetailsBook
const getDetailsBook = async (req, res) => {
    try {
        const bookId = req.params.id

        //Kiem tra userId co hop le
        if (!bookId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The bookId is required(bookId kh hợp lệ)'
            });
        }

        console.log('ID của 1 book: ', bookId);
        const response = await BookServices.getDetailsBook(bookId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: ' getDetailsBook Loi nha '
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
        const isTrueName = specialChars.test(name)
        const isTrueTotal = specialChars.test(total)
        const isTrueStock = specialChars.test(stock)
        const isTrueDescription = specialChars.test(description)
        const isTrueContent = specialChars.test(content)

        //Kiem tra bookId co hop le
        if (!bookId) {
            console.log('000')
            return res.json({
                status: 'ERR',
                message: 'bookId không hợp lệ !'
            });
        }

        //Kiểm tra 
        if (!name || !year_creation || !description || !content || !total || !stock) {
            console.log('111');
            //Kiểm tra tồn tại các giá trị
            return res.json({
                status: 'ERR',
                message: 'Một hoặc nhiều trường không tồn tại !'
            });
        } else if (isTrueName) {
            console.log('333');
            //Kiểm tra Tên sách 
            return res.json({
                status: 'ERR',
                message: 'Tên sách không hợp lệ !'
            });
        } else if (isTrueDescription) {
            //Kiểm tra Mô tả 
            return res.status(500).json({
                status: 'ERR',
                message: 'Mô tả không hợp lệ!'
            });
        } else if (isTrueContent) {
            //Kiểm tra Nội dung 
            return res.status(500).json({
                status: 'ERR',
                message: 'Nội dung không hợp lệ!'
            });
        } else if (isTrueTotal || total < 0  ) {
            console.log('444');
            //Kiểm tra total 
            return res.json({
                status: 'ERR',
                message: 'Tổng số lượng không hợp lệ !'
            });
        } else if(isTrueStock || stock < 0 ) {
            console.log('444');
            //Kiểm tra stock 
            return res.json({
                status: 'ERR',
                message: 'Số lượng tồn không hợp lệ !'
            });
        }

        console.log('ID của 1 user: ', bookId);
        const response = await BookServices.updateBook(bookId, data);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: 'updatedBook Lỗi '
        })
    }
};

//deleteBook
const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id

        //Kiem tra bookId co hop le
        if (!bookId) {
            return res.status(200).join({
                status: 'ERR',
                message: 'Khong ton tai sach'
            });
        }

        const response = await BookServices.deleteBook(bookId);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: 'deleteBook Lỗi '
        })
    }
};

module.exports = {
    createBook,
    getAllBook,
    getDetailsBook,
    updateBook,
    deleteBook,
}