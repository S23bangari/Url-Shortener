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

    // Find the user by email and password
    const user = await User.findOne({ email, password });

    // Handle invalid login
    if (!user) {
        return res.render('login', {
            error: 'Invalid username or password',
        });
    }

    // Create a token with essential fields (id, role, etc.)
    const token = setUser({ id: user._id, role: user.role });

    // Set token in the 'token' cookie
    res.cookie("token", token, { httpOnly: true, secure: false });

    // Redirect to the homepage after successful login
    return res.redirect("/");
}



module.exports = { 
    handelUserSignup,
    handelUserLogin,    
 };
