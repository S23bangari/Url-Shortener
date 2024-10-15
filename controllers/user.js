const {v4:uuidv4} = require('uuid')
const User = require('../models/user');
const {setUser} = require('../service/auth')


async function handelUserSignup(req, res) {
    const { name, email, password } = req.body;

    // Handle validation or checks if necessary
    try {
        const newUser = await User.create({ name, email, password });
        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        return res.status(500).json({ error: "Error creating user", details: error.message });
    }
}

async function handelUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email , password });

    if(!user) return res.render('login',{
        error:'Invalid User name or password'
    })

    const sessionId = uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect("/");
}


module.exports = { 
    handelUserSignup,
    handelUserLogin,    
 };
