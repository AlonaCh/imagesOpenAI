import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import multer from 'multer';


const PORT = 8080


const app = express()
app.use(cors())
app.use(express.json())
// Load environment variables from .env file
dotenv.config();

//to help with file system, send img from the frontend and store in backend
// const multer = require('multer')

//to store the image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')//folder name
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage }).single("file")

let filePath

app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }
        filePath = req.file.path
        //res.status(200).json({ filePath });
    })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))