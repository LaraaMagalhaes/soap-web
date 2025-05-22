import jwt from 'jsonwebtoken';
import dontenv from 'dotenv';

dontenv.config();

export const gerarToken = (usuario) => {
    return jwt.sign(
        {usuario},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
}