const express = require('express');
const URL = require('../models/url'); // Make sure to import URL model if needed

const router = express.Router();

router.get("/", async (req, res) => {
    const allUrls = await URL.find({});
    const id = req.query.id; // Get id from query parameters
    return res.render('home', {
        urls: allUrls,
        id: id, // Pass id to the view
    });
});

module.exports = router;
