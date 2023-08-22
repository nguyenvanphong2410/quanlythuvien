const BookServices = require('../services/BookServices')
const Book = require('../models/BookModel')

const createBook = async (req, res) => {
    try {

        const { name, year_creation, description, content, total, stock } = req.body;
        console.log(req.body);

        // Chuyển đổi total và stock sang số nguyên
        const totalInt = parseInt(total, 10);
        const stockInt = parseInt(stock, 10);

        //Kí tự đặc biệt
        const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const isTrueName = specialChars.test(name)
        const isTrueDescription = specialChars.test(description)
        const isTrueContent = specialChars.test(content)

        if (!name || !year_creation || !description || !content || !total || !stock) {
            //Kiểm tra tồn tại các giá trị
            return res.status(500).json({
                status: 'ERR',
                message: 'Một hoặc nhiều trường không tồn tại !'
            });
        } else if (isTrueName) {
            //Kiểm tra Tên có chứa kí tự đặc biệt không ?
            return res.status(500).json({
                status: 'ERR',
                message: 'Tên không hợp lệ!'
            });
        } else if (isTrueDescription) {
            //Kiểm tra Mô tả có chứa kí tự đặc biệt không ?
            return res.status(500).json({
                status: 'ERR',
                message: 'Mô tả không hợp lệ!'
            });
        } else if (isTrueContent) {
            //Kiểm tra Nội dung có chứa kí tự đặc biệt không ?
            return res.status(500).json({
                status: 'ERR',
                message: 'Nội dung không hợp lệ!'
            });
        } 
        else if (total < 0 || stock < 0) {
            // Kiểm tra total và stock có phải là số âm ?
            return res.status(500).json({
                status: 'ERR',
                message: 'total và stock không hợp lệ!'
            });
        }

        const createdBook = await Book.create({
            name,
            year_creation,
            description,
            content,
            total: totalInt, // Sử dụng giá trị số nguyên đã chuyển đổi
            stock: stockInt
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