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
                message: 'Vui lòng điền đầy đủ thông tin!'
            });
        } else if (isTrueName) {
            return res.json({
                status: 'ERR',
                message: 'Tên thể loại không hợp lệ!'
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
            return res.status(201).json({
                status: 'OK',
                message: 'Tạo mới thể loại sách thành công',
                data: createdCategory
            });
        }

    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi tạo mới thể loại sách!'
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
            message: 'Lỗi lấy ra thể loại sách'
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
                message: 'Thể loại này không tồn tại'
            });
        }

        const response = await CategoryServices.getDetailsCategory(categoryId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: 'Lỗi lấy 1 thể loại! '
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
                message: 'Tác thể loại không hợp lệ !'
            });
        }

        //Kiểm tra 
        if (!name || !description) {
            return res.json({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin !'
            });
        } else if (isTrueName) {
            return res.json({
                status: 'ERR',
                message: 'Tên thể loại không hợp lệ !'
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
            message: 'Lỗi cập nhật thông tin '
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
                message: 'Không tồn tại thể loại sách'
            });
        }

        const response = await CategoryServices.deleteCategory(categoryId);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: 'Lỗi Xóa thể loại sách'
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