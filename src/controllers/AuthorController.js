const AuthorService = require('../services/AuthorServices')
const JwtServices = require('../services/JwtServices')
const Author = require('../models/AuthorModel')
const { responseSuccess, responseError } = require('../utils/ResponseHandle');

const createAuthor = async (req, res) => {
    try {
        const { name, date_of_birth, story } = req.body;
        console.log(req.body);

        //Chuỗi so sánh
        const hasNumber = /\d/;
        const specialChars = /[$%^&*_\[\]{}\\|<>\/]+/;
        const specialCharsStory = /[$%^&*_\[\]{}\\|]+/;

        const isTrueName = specialChars.test(name)
        const ishasNumberName = hasNumber.test(name);
        const isTrueStory = specialCharsStory.test(story)

        if (!name || !date_of_birth || !story) {
            return responseError(res, 400, 'null', 'Thông tin trống !!! ')
        } else if (isTrueName) {
            return responseError(res, 400, 'name', 'Tên không hợp lệ !!! ')
        } else if (ishasNumberName) {
            return responseError(res, 400, 'name', 'Tên có chứa số !!! ')
        } else if (isTrueStory) {
            return responseError(res, 400, 'story', 'Tiểu sử không hợp lệ !!! ')
        }
        const createdAuthor = await Author.create({
            name,
            date_of_birth,
            story,
        })

        if (createdAuthor) {
            console.log('Tạo mới tác giả thành công');
            return responseSuccess(res, {
                status: 'OK',
                message: 'Tạo mới tác giả thành công',
                data: createdAuthor
            }, 200);
        }

    } catch (e) {
        console.log(e)
        return responseError(res, 500, 'err', 'Tạo mới tác giả thất bại !!! ')
    }
};

//getAllUser User
const getAllAuthor = async (req, res) => {
    try {
        const response = await AuthorService.getAllAuthor();
        return res.status(200).json(response);
    } catch (e) {
        return responseError(res, 500, 'err', 'Lấy toàn tác giả thất bại !!! ')
    }
};

//getDetailsAuthor
const getDetailsAuthor = async (req, res) => {
    try {
        const authorId = req.params.id
        //Kiem tra authorId co hop le
        if (!authorId) {
            return responseError(res, 400, 'not found', 'Tác giả không tồn tại !!! ')
        }

        const response = await AuthorService.getDetailsAuthor(authorId, res);
        return res.status(200).json(response);
    } catch (e) {
        return responseError(res, 500, 'err', 'Lấy chi tiết tác giả thất bại !!! ')
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
        const specialCharsStory = /[$%^&*_\[\]{}|]+/;
        const isTrueName = specialChars.test(name)
        const isTrueStory = specialCharsStory.test(story)

        //Kiem tra authorId co hop le
        if (!authorId) {
            return responseError(res, 400, 'not found', 'Tác giả không tồn tại !!! ')
        }

        //Kiểm tra 
        if (!name || !date_of_birth || !story) {
            return responseError(res, 400, 'null', 'Thông tin trống !!! ')

        } else if (isTrueName) {
            return responseError(res, 400, 'name', 'Tên không hợp lệ !!! ')

        } else if (isTrueStory) {
            return responseError(res, 400, 'story', 'Tiểu sử không hợp lệ !!! ')

        }

        console.log('ID của 1 tác giả: ', authorId);
        const response = await AuthorService.updateAuthor(authorId, data, res);

        return res.status(200).json(response);
    } catch (e) {
        return responseError(res, 500, 'err', 'Cập nhật tác giả thất bại !!! ')
    }
};


//deleteAuthor
const deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id

        if (!authorId) {
            return responseError(res, 400, 'not found', 'Không tồn tại tác giả này !!! ')
        }

        const response = await AuthorService.deleteAuthor(authorId, res);
        return res.status(200).json(response);
    } catch (e) {
        return responseError(res, 500, 'err', 'Xóa tác giả thất bại !!! ')
    };
}
    module.exports = {
        createAuthor,
        getAllAuthor,
        getDetailsAuthor,
        updateAuthor,
        deleteAuthor
    }