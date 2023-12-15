import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import multer from "multer";
import Randomstring from "randomstring";
import fs from "fs";

// Routes
import UsersRoute from "./routes/UsersRoute.js";
import ProductsRoute from "./routes/ProductsRoute.js";
import OrdersRoute from "./routes/OrdersRoute.js";

// Init Config
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync('images')) {
            console.log(fs.mkdirSync('images'))
        }
        
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Randomstring.generate(25) + '-' + file.originalname.replaceAll(' ', '-'))
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    }else {
        cb(null, false)
    }
}
app.use(multer({limits: 2048, storage: fileStorage, fileFilter: fileFilter}).single('productImage'))

// Server Running
app.listen(process.env.PORT, () => console.log(`Server is running at PORT ${process.env.PORT}`))
app.get('/', (req, res) => {
    res.json(`Server is running at PORT ${process.env.PORT}`)
})

// All Routes
app.use(UsersRoute)
app.use(ProductsRoute)
app.use(OrdersRoute)