const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {connectToMongoDB} = require('./connect');
const {checkForAuthentication,restrictTo} = require('./middlewares/auth')
const URL = require('./models/url');

const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => {
    console.log(`MongoDB connected`);
})

app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(checkForAuthentication);



app.use("/url",restrictTo(["NORMAL"]),urlRoute);   
app.use("/user", userRoute); 
app.use("/",staticRouter);


app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamps: Date.now() } } },
        { new: true }
    );

    // Check if entry is null (i.e., shortId not found in the database)
    if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(entry.redirectURL);
});

app.listen(PORT,() => console.log(`Server Started at PORT ${PORT}`));