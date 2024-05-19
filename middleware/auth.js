const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.signedCookies.access_token;
    const tokenBlacklist = new Set();

          // Check if token is blacklisted
    if (tokenBlacklist.has(token)) {
        return res.status(403).json({ message: "Token is invalidated." });
    }
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
