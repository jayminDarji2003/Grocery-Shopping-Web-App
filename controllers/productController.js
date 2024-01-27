import productModel from "../models/productModel.js"
import categoryModel from "../models/categoryModel.js"
import fs from 'fs'
import slugify from "slugify"
import braintree from "braintree"
import orderModel from "../models/orderModel.js"
import dotenv from "dotenv"

dotenv.config()

// Payment Gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required " })
            case !description:
                return res.status(500).send({ error: "Description is Required " })
            case !price:
                return res.status(500).send({ error: "Price is Required " })
            case !category:
                return res.status(500).send({ error: "Category is Required " })
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required " })
            case !photo && photo.size > 1000000:
                return res.status(500).send({ error: "Image is Required and Should be less than 1MB" })
        }
        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error in creating product",
            error
        })
    }
}

// Get all products 

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").sort({ createdAt: -1 })
        // ".select method is used to select the field we have to display"
        // .select("-photo") method means all the field minus "photo" 
        res.status(200).send({
            success: true,
            msg: "Got all products Successfully ",
            counTotal: products.length,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error in getting products",
            error
        })
    }
}
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            msg: "Got Single Product Successfully",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error in getting Single products",
            error
        })
    }
}
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error in getting product Photo",
            error
        })
    }

}
export const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            msg: "Product Deleted successfully",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error in getting product Photo",
            error
        })
    }
}
export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required " })
            case !description:
                return res.status(500).send({ error: "Description is Required " })
            case !price:
                return res.status(500).send({ error: "Price is Required " })
            case !category:
                return res.status(500).send({ error: "Category is Required " })
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required " })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Image is Required and Should be less than 1MB" })
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) }, { new: true }
        )
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error in updating product",
            error
        })
    }
}
export const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            message: "Product Filtered Successfully",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error in filtering product",
            error
        })
    }
}
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            msg: "Error in product count",
            error
        })
    }
}

// product list based on page 
export const productListController = async (req, res) => {
    try {
        const perPage = 50
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })

        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error in Product List count",
            error
        })
    }
}

export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }

            ]
        }).select('-photo')
        res.json(results)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error while Searching product ",
            error
        })
    }
}

export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error while geting related product",
            error,
        });
    }
}

export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        const products = await productModel.find({ category }).populate('category')
        res.status(200).send({
            success: true,
            category,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error while getting product",
            error,
        });
    }
}

// payment gateway api
// token
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.send(response)
            }

        })
    } catch (error) {
        console.log(error)
    }
}

// payment 
export const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart.forEach((item) => {
            total += item.price;
        });

        gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true,
            },
        }, async (error, result) => {
            if (result) {
                const order = new orderModel({
                    products: cart,
                    payment: result,
                    buyer: req.user._id,
                });

                await order.save(); // Add await here

                res.send({ ok: true });
            } else {
                res.status(500).send(error);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
