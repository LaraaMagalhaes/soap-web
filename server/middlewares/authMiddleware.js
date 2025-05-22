import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const autenticarToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if(!token){
        return res.status(401).json({message: 'Token não fornecido'});
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decode.usuario;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Token inválido'});
    }
};