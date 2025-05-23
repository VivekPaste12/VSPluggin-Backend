import { verifyToken } from '../utils/jwt.js';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or malformed' });
    }

    try {
        const token = authHeader.split(' ')[1];  
        const decoded = verifyToken(token);  
        req.user = decoded; 
        next();
    } catch (error) {
        console.error('Token verification error:', error); 
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};

export default authMiddleware;
