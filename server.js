import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoute from "./routers/authRoute.js"
import categoryRoute from "./routers/categoryRoute.js"
import productRoute from './routers/productRoute.js'
import userRoute from './routers/userRoute.js'
import cookieParser from "cookie-parser";

import cors from 'cors'

// config statement for ".env" file
dotenv.config()
const app = express()

//  connecting database 
connectDB()

//  midllewares
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // Important to allow cookies
}));
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser());

//  using Router
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/user', userRoute)


app.get('/', (req, res) => {
    res.send({
        msg: "Hello World!"
    })
})

// PORT 
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is Working on http://localhost:${PORT}`.bgCyan.white)
})

// ----------------- Notes About the Packages we have installed and use in this project