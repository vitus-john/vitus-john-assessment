const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.signedCookies.access_token;
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log('User authenticated:', req.user);
        next();
    } catch (err) {
        console.log('Invalid token:', err);
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;
