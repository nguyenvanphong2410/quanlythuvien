const CategoryServices = require('../services/CategoryServices');
const Category = require('../models/CategoryModel');

const createCategoriesBook = async (req, res) => {
    try {
        const { name, description } = req.body;
        console.log(req.body);

        //Kí tự đặc biệt
        const specialChars = /[$%^&*_\[\]{}\\|<>\/]+/;
        const specialCharsDescription = /[$%^&*_\[\]{}|]+/;
        const isTrueName = specialChars.test(name)
        const isTrueDescription = specialCharsDescription.test(description)

        if (!name || !description) {
            return res.json({
                status: 'ERR',
                message: 'Một hoặc nhiều trường không tồn tại !'
            });
        } else if (isTrueName) {
            return res.json({
                status: 'ERR',
                message: 'Tên không hợp lệ!'
            });
        } else if (isTrueDescription) {
            return res.json({
                status: 'ERR',
                message: 'Mô tả không hợp lệ!'
            });
        }

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

//getDetailsCategory
const getDetailsCategory = async (req, res) => {
    try {
        const categoryId = req.params.id

        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tồn tại categoryId'
            });
        }

        const response = await CategoryServices.getDetailsCategory(categoryId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: ' getDetailsCategory Lỗi ! '
        })
    }
};

//updateCategory
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


//updateCategory
const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const { name, description } = req.body;
        const data = req.body;

        //Kí tự đặc biệt
        const specialChars = /[$%^&*_\[\]{}\\|<>\/]+/;
        const specialCharsDescription = /[$%^&*_\[\]{}|]+/;
        const isTrueName = specialChars.test(name)
        const isTrueDescription = specialCharsDescription.test(description)

        if (!categoryId) {
            return res.json({
                status: 'ERR',
                message: 'Tác giả id không hợp lệ !'
            });
        }

        //Kiểm tra 
        if (!name || !description) {
            return res.json({
                status: 'ERR',
                message: 'Một hoặc nhiều trường không tồn tại !'
            });
        } else if (isTrueName) {
            return res.json({
                status: 'ERR',
                message: 'Tên tác giả không hợp lệ !'
            });
        } else if (isTrueDescription) {
            return res.status(500).json({
                status: 'ERR',
                message: 'Mô tả không hợp lệ!'
            });
        }

        const response = await CategoryServices.updateCategory(categoryId, data);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: 'updateCategory Lỗi '
        })
    }
};

//deleteCategory
const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id

        //Kiem tra categoryId co hop le
        if (!categoryId) {
            return res.status(200).join({
                status: 'ERR',
                message: 'Khong ton tai Danh muc'
            });
        }

        const response = await CategoryServices.deleteCategory(categoryId);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: 'deleteCategory Lỗi '
        })
    }
};


module.exports = {
    createCategoriesBook,
    getAllCategoriesBook,
    getDetailsCategory,
    updateCategory,
    deleteCategory,
}