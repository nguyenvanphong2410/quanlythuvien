const AuthorService = require('../services/AuthorServices')
const JwtServices = require('../services/JwtServices')
const Author = require('../models/AuthorModel')

const createAuthor = async (req, res) => {
    try {
        const { name, date_of_birth, story } = req.body;
        console.log(req.body);

        //Kí tự đặc biệt
        const specialChars = /[$%^&*_\[\]{}\\|<>\/]+/;
        const specialCharsStory = /[$%^&*_\[\]{}\\|]+/;
        const isTrueName = specialChars.test(name)
        const isTrueStory = specialCharsStory.test(story)
        console.log(isTrueName);

        if (!name || !date_of_birth || !story ) {
            return res.json({
                status: 'ERR',
                message: 'Một hoặc nhiều trường không tồn tại !'
            });
        } else if (isTrueName) {
            return res.json({
                status: 'ERR',
                message: 'Tên không hợp lệ!'
            });
        }else if (isTrueStory) {
            return res.json({
                status: 'ERR',
                message: 'Tiểu sử không hợp lệ!'
            });
        }

        const createdAuthor = await Author.create({
            name,
            date_of_birth,
            story,
            
        })

        if (createdAuthor) {
            console.log('Tạo mới tác giả thành công');
            return res.json({
                status: 'OK',
                message: 'Tạo mới tác giả thành công',
                data: createdAuthor
            });

        }

    } catch (e) {
        return res.json({
            status: 'ERR',
            message: 'Lỗi tạo mới tác giả!'
        })
    }
};

//getAllUser User
const getAllAuthor = async (req, res) => {
    try {

        const response = await AuthorService.getAllAuthor();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: 'getAllAuthor: Lỗi'
        })
    }
};

//getDetailsAuthor
const getDetailsAuthor = async (req, res) => {
    try {
        const authorId = req.params.id

        //Kiem tra userId co hop le
        if (!authorId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The bookId is required(bookId kh hợp lệ)'
            });
        }

        console.log('ID của 1 book: ', authorId);
        const response = await AuthorService.getDetailsAuthor(authorId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: ' getDetailsAuthor Loi nha '
        })
    }
};

//updateAuthor
const updateAuthor = async (req, res) => {
    try {
        //Nhận vào user id qua url
        const authorId = req.params.id
        const { name, date_of_birth, story } = req.body;
        const data = req.body;
        console.log(data);

        //Kí tự đặc biệt
        const specialChars = /[$%^&*_\[\]{}\\|<>\/]+/;
        const isTrueName = specialChars.test(name)
        const isTrueStory = specialChars.test(story)

        //Kiem tra bookId co hop le
        if (!authorId) {
            console.log('000')
            return res.json({
                status: 'ERR',
                message: 'Tác giả id không hợp lệ !'
            });
        }

        //Kiểm tra 
        if (!name || !date_of_birth || !story ) {
            console.log('111');
            //Kiểm tra tồn tại các giá trị
            return res.json({
                status: 'ERR',
                message: 'Một hoặc nhiều trường không tồn tại !'
            });
        } else if (isTrueName) {
            console.log('333');
            //Kiểm tra Tên tác giả 
            return res.json({
                status: 'ERR',
                message: 'Tên tác giả không hợp lệ !'
            });
        } else if (isTrueStory) {
            //Kiểm tra Tiểu sử 
            return res.status(500).json({
                status: 'ERR',
                message: 'Tiểu sử không hợp lệ!'
            });
        } 

        console.log('ID của 1 tác giả: ', authorId);
        const response = await AuthorService.updateAuthor(authorId, data);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: 'updateAuthor Lỗi '
        })
    }
};


//deleteAuthor
const deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id

        //Kiem tra authorId co hop le
        if (!authorId) {
            return res.status(200).join({
                status: 'ERR',
                message: 'Khong ton tai tác giả'
            });
        }

        const response = await AuthorService.deleteAuthor(authorId);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: 'deleteAuthor Lỗi '
        })
    }
};

module.exports = {
    createAuthor,
    getAllAuthor,
    getDetailsAuthor,
    updateAuthor,
    deleteAuthor
}