import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken'
import orderModel from '../models/orderModel.js'
// import { hashPassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        // Check if the required fields are provided
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).send({
                success: false,
                msg: "All fields are required",
            });
        }
        // Check if the email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                msg: "Email already exists",
            });
        }
        // Hash the password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        // const hashedPassword = await hashPassword(password);

        // Create a new user and save it to the database
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            answer,
        });

        res.status(201).send({
            success: true,
            msg: "User registered successfully",
            user: newUser,
        });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).send({
            success: false,
            msg: "Error in registration",
            error: error.message,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                msg: "Invalid Email or password"
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                msg: "Email is not registered"
            })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                msg: "Invalid Password"
            })
        }
        const token = await JWT.sign({ _id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        res.status(200).send({
            success: true,
            msg: "Login successfull",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error in login",
            error
        })
    }
}

// ForgetPassword Controller
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email || !answer || !newPassword) {
            res.status(400).send({ msg: "All credentials are required" })
        }
        // check the email and answer 
        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(404).send({
                success: false,
                msg: "Wrong Email or Answer"
            })
        }
        const salt = 10;
        const hashed = await bcrypt.hash(newPassword, salt);
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            msg: "Password Reset Successfully",
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Something went wrong",
            error
        })
    }
}

//  Test Controller 
export const testController = (req, res) => {
    try {
        res.send("Protected Routes")
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body
        const user = await userModel.findById(req.user._id)

        // password
        if (password && password.length < 6) {
            return res.json({ error: 'Password is required and 6 character long' })
        }
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt)
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        }, { new: true })

        res.status(200).send({
            success: true,
            msg: " Profile Updates Success ",
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error while Updating the user porfile ",
            error
        })
    }
}

export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name")
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error while Getting Orders ",
            error
        })
    }
}

export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate("products", "-photo").populate("buyer", "name");
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error while Getting all Orders ",
            error
        })
    }
}
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.params
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.json(orders);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error while Updating Orders Status ",
            error
        })
    }
}