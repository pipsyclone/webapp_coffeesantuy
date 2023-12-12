import express from "express";
import cors from "cors";
import dotenv from "dotenv"

import UsersRoute from "./routes/UsersRoute.js";

// Init Config
dotenv.config()
const app = express()
app.use(cors({
    credentials: true
}))
app.use(express.json())

// Server Running
app.listen(process.env.PORT, () => console.log(`Server is running at PORT ${process.env.PORT}`))
app.get('/', (req, res) => {
    res.json(`Server is running at PORT ${process.env.PORT}`)
})

// All Routes
app.use(UsersRoute)