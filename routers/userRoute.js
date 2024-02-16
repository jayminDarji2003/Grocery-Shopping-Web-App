import express from "express";
import { userController } from "../controllers/userController.js";

const router = express.Router()

// getAll users data
router.get('/get-users', userController)

// exporting user route
export default router;