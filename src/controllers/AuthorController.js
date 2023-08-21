const AuthorService = require('../services/AuthorServices')
const JwtServices = require('../services/JwtServices')
const Author = require('../models/AuthorModel')

const createAuthor = async (req, res) => {
    try {
        const { name, date_of_birth, story} = req.body;
        console.log(req.body);
        const createdAuthor = await Author.create({
            name,
            date_of_birth,
            story
        })
        if (createdAuthor) {
            console.log('Tạo mới tác giả thành công');
            return res.status(201).json({
                status: 'OK',
                message: 'Tạo mới tác giả thành công',
                data: createdAuthor
            });

        }

    } catch (e) {
        return res.status(500).json({
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

module.exports = {
    createAuthor,
    getAllAuthor,
  
}