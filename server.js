import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import multer from 'multer';
import OpenAI from 'openai';


const PORT = 8080

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

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
        cb(null, 'public'); // Destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // File naming
    }
});

const upload = multer({ storage }).single('file');


// Serve the uploaded image

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        // File path is stored in `req.file.path`
        const filePath = req.file.path;
        res.status(200).json({ filePath });
    });
});


app.post('/openai', async (req, res) => {
    try {
 const prompt = req.body.message;

   const imageAsBase64 = fs.readFileSync(filePath, "base64")
   const response = await openai.chat.completions.create({
model: "gpt-4o",
messages: [
    {
        role: "user",
        content: [
            {type: "text", text: prompt},
            {type: "image_url", image_url:{
                url: `data:image/jpeg;base64,${imageAsBase64}`
            }}
        ]
    }
]
   }
   )
    console.log(response)
    } catch (err) {
        console.error(err);
    }
    })
   

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))