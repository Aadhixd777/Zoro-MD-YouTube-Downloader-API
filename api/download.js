const express = require('express');
const youtubeDl = require('youtube-dl-exec');
const app = express();

app.get('/api/download', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.json({ status: false, error: 'Please provide a YouTube URL' });
    }

    try {
        const output = await youtubeDl(videoUrl, {
            getDownloadUrl: true,
            format: 'bestaudio',
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true
        });

        res.json({
            status: true,
            download_url: output.trim()
        });
    } catch (err) {
        res.json({ status: false, error: err.message });
    }
});

module.exports = app;
