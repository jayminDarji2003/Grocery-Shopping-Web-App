import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.ObjectId,
                ref: 'Products', // Corrected reference name to "Product"
            },
        ],
        payment: {},
        buyer: {
            type: mongoose.ObjectId,
            ref: 'users', // Assuming your user model is named "User"
        },
        status: {
            type: String,
            default: 'Not Process',
            enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"], // Removed space in enum values
        },
    },
    { timestamps: true }
);

export default mongoose.model('Order', orderSchema);