import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ msg: 'Name is required' })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                msg: 'Category Already Exists'
            })
        }
        const category = await categoryModel.create({ name, slug: slugify(name) })
        res.status(201).send({
            success: true,
            msg: " New category created",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error in Category",
            error
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        // "{ new: true }" you have to pass this every time you are updating the data otherwise it will not update ur data 
        res.status(200).send({
            success: true,
            message: " Category Updated Successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error while updating category",
            error
        })
    }
}

export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            msg: "All Categories List",
            category,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error while Getting all categories",
            error
        })
    }
}

export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            msg: " Got Single Category Successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            msg: "Error While getting Single Category"
        })
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            msg: "Deleted category successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error While deleting Category",
            error,
        })
    }
}