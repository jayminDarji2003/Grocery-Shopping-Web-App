import mongoose from "mongoose";
import categoryModel from "./categoryModel.js";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: "Category",
        required: true
    },
    quantity: {
        // type: Number,
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    shipping: {
        type: Boolean,

    },
},
    { timestamps: true }
);

export default mongoose.model("Products", productSchema);