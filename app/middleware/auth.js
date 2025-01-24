import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';

export const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.cookies.jwt;
    console.log(token);
    if (!token) {
        return res.status(403).json({ message: 'No se ha proporcionado un token' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token no válido o expirado' });
        }
        req.userId = decoded.id;
        next();
    });
};