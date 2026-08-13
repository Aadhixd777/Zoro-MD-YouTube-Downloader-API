const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/api/download', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.json({ status: false, error: 'Please provide a YouTube URL' });
    }

    try {
        // External stable public fallback/handler to ensure zero downtime on Vercel
        const apiRes = await fetch(`https://delirius-apii.vercel.app/download/ytmp3?url=${encodeURIComponent(videoUrl)}`);
        const json = await apiRes.json();

        if (!json.status || !json.data?.download?.url) {
            throw new Error('Download link extraction failed');
        }

        res.json({
            status: true,
            download_url: json.data.download.url
        });
    } catch (err) {
        res.json({ status: false, error: err.message });
    }
});

module.exports = app;
