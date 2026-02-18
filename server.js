const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Upload video endpoint
app.post('/upload-video', upload.single('video'), (req, res) => {
    res.json({ message: 'Video uploaded successfully', filePath: req.file.path });
});

// Upload audio endpoint
app.post('/upload-audio', upload.single('audio'), (req, res) => {
    res.json({ message: 'Audio uploaded successfully', filePath: req.file.path });
});

// Process montage endpoint
app.post('/create-montage', (req, res) => {
    const videoPath = req.body.videoPath; // Assuming the paths are received in request body
    const audioPath = req.body.audioPath;

    const outputPath = path.join('uploads', `montage-${Date.now()}.mp4`);

    ffmpeg()
        .input(videoPath)
        .input(audioPath)
        .outputOptions('-c:v libx264')
        .save(outputPath)
        .on('end', () => {
            res.json({ message: 'Montage created successfully', outputPath });
        })
        .on('error', (err) => {
            res.status(500).json({ error: err.message });
        });
});

// Download endpoint
app.get('/download/:filename', (req, res) => {
    const file = path.join(__dirname, 'uploads', req.params.filename);
    res.download(file); 
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
