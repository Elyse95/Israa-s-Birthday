const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Directory where images and videos are stored
const galleryDir = path.join(__dirname, 'gallery');

// Serve static files
app.use(express.static(__dirname));

// Endpoint to get list of files in the gallery directory
app.get('/api/gallery', (req, res) => {
    fs.readdir(galleryDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to load gallery files' });
        }
        // Filter only image and video files
        const mediaFiles = files.filter(file => file.endsWith('.png') || file.endsWith('.mp4'));
        res.json(mediaFiles);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
