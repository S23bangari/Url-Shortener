const express = require('express');
const URL = require('../models/url'); // Make sure to import URL model if needed
const { restrictTo } = require('../middlewares/auth');

const router = express.Router(); 

router.get("/admin/urls",restrictTo(["ADMIN"]),async(req,res) => {
    const allUrls = await URL.find({ });
    const id = req.query.id; // Get id from query parameters
    return res.render('home', {
        urls: allUrls,
        id: id, // Pass id to the view
    });
});

router.get("/", restrictTo(['NORMAL']),async (req, res) => {
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
