const express = require('express');
const URL = require('../models/url'); // Make sure to import URL model if needed

const router = express.Router(); 

router.get("/", async (req, res) => {
    if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({ createdBy:req.user._id});
    const id = req.query.id; // Get id from query parameters
    return res.render('home', {
        urls: allUrls,
        id: id, // Pass id to the view
    });
});

router.get('/signup',(req,res) => {
    return res.render('signup');
})

router.get('/login',(req,res) => {
    return res.render('login');
})

module.exports = router;
