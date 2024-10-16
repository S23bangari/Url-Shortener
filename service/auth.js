const jwt = require('jsonwebtoken');
const secret = "Somil$123@$";  // Use your actual secret here

function setUser(user) {
    // Create a payload with only the necessary fields (id, name, email)
    const payload = {
        id: user._id,    // MongoDB's ObjectId
        name: user.name,
        email: user.email
    };

    // Sign the token using the secret key
    return jwt.sign(payload, secret);
}

function getUser(token) {
    if (!token) return null;

    // Verify the token using the secret key
    return jwt.verify(token, secret);
}

module.exports = {
    setUser,
    getUser
};
