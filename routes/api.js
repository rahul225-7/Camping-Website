const express = require('express');
const router = express.Router();
const { createClient } = require('pexels');

const client = createClient(process.env.PEXELS_API_KEY);

router.get('/random-camp-image', async (req, res) => {
    try {
        const result = await client.photos.search({
            query: 'camping',
            per_page: 30,
            orientation: 'landscape'
        });

        if (!result.photos || result.photos.length === 0) {
            return res.status(500).json({ error: 'No images found' });
        }

        const randomPhoto =
            result.photos[Math.floor(Math.random() * result.photos.length)];

        res.json({
            imageUrl: randomPhoto.src.large
        });
    } catch (err) {
        console.error('PEXELS ERROR:', err.message);
        res.status(500).json({ error: 'Failed to fetch image' });
    }
});

module.exports = router;
