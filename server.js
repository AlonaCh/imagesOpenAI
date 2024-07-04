const PORT = 8080

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()
const fs = require('fs')//to help with file system, send img from the frontend and store in backend
const multer = require('multer')

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
    })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))