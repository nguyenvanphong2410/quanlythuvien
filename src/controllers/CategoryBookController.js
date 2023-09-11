const CategoryServices = require('../services/CategoryServices');
const Category = require('../models/CategoryModel');
const { responseSuccess, responseError } = require('../utils/ResponseHandle');

const createCategoriesBook = async (req, res) => {
    try {
        const { name, description } = req.body;
        console.log(req.body);

        //Chuỗi so sánh
        const hasNumber = /\d/;
        const specialChars = /[$%^&*_\[\]{}\\|<>\/]+/;
        const specialCharsDescription = /[$%^&*_\[\]{}|]+/;

        const isTrueName = specialChars.test(name)
        const ishasNumberName = hasNumber.test(name);
        const isTrueDescription = specialCharsDescription.test(description)

        if (!name || !description) {
            return responseError(res, 400, 'null', 'Thông tin trống !!! ')
        } else if (isTrueName) {
            return responseError(res, 400, 'name', 'Tên không hợp lệ !!! ')
        } else if (ishasNumberName) {
            return responseError(res, 400, 'name', 'Tên có chứa số !!! ')
        } else if (isTrueDescription) {
            return responseError(res, 400, 'description', 'Mô tả không hợp lệ !!! ')
        }

        const createdCategory = await Category.create({ name, description })
        if (createdCategory) {
            return responseSuccess(res, {
                status: 'OK',
                message: 'Tạo mới danh mục thành công',
                data: createdCategory
            }, 200);
        }

    } catch (e) {
        return responseError(res, 500, 'err', 'Tạo mới thể loại sách thất bại !!! ')
    }
};

//getAllBook
const getAllCategoriesBook = async (req, res) => {
    try {
        const response = await CategoryServices.getAllCategoriesBook();
        return res.status(200).json(response);
    } catch (e) {
        return responseError(res, 500, 'err', 'Lấy tất cả thể loại sách thất bại !!! ')
    }
};

//getDetailsCategory
const getDetailsCategory = async (req, res) => {
    try {
        const categoryId = req.params.id

        if (!categoryId) {
            return responseError(res, 400, 'not found', 'Thể loại sách này không tồn tại !!! ')

        }

        const response = await CategoryServices.getDetailsCategory(categoryId, res);
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

        //Chuỗi so sánh
        const hasNumber = /\d/;
        const specialChars = /[$%^&*_\[\]{}\\|<>\/]+/;
        const specialCharsDescription = /[$%^&*_\[\]{}|]+/;

        const isTrueName = specialChars.test(name)
        const ishasNumberName = hasNumber.test(name);
        const isTrueDescription = specialCharsDescription.test(description)


        if (!categoryId) {
            return responseError(res, 400, 'not found', 'Thể loại sách không tồn tại !!! ')
        }

        //Kiểm tra 
        if (!name || !description) {
            return responseError(res, 400, 'null', 'Thông tin trống !!! ')
        } else if (isTrueName) {
            return responseError(res, 400, 'name', 'Tên thể loại không hợp lệ !!! ')
        } else if (ishasNumberName) {
            return responseError(res, 400, 'name', 'Tên thể loại có chứa số !!! ')
        } else if (isTrueDescription) {
            return responseError(res, 400, 'description', 'Mô tả không hợp lệ !!! ')
        }

        const response = await CategoryServices.updateCategory(categoryId, data, res);

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

        const response = await CategoryServices.deleteCategory(categoryId, res);
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