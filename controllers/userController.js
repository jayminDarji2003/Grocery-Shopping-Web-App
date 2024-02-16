import userModel from "../models/userModel.js";

export const userController = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send({
            success: true,
            msg: "All Categories List",
            users,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msg: "Error while Getting all users data",
            error
        })
    }
}
