const CategoryServices = require('../services/CategoryServices');
const Category = require('../models/CategoryModel');

const createCategoriesBook = async (req, res) => {
    try {
        const { name, description } = req.body;
        console.log(req.body);
        const createdCategory = await Category.create({
            name,
            description,
        })
        if (createdCategory) {
            console.log('Tạo mới danh mục thành công');
            return res.status(201).json({
                status: 'OK',
                message: 'Tạo mới danh mục thành công',
                data: createdCategory
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
const getAllCategoriesBook = async (req, res) => {
    try {
        const response = await CategoryServices.getAllCategoriesBook();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: 'getAllCategoriesBook: Lỗi'
        })
    }
};



module.exports = {
    createCategoriesBook,
    getAllCategoriesBook,
}