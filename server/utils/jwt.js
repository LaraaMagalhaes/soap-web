import jwt from 'jsonwebtoken';
import dontenv from 'dotenv';

dontenv.config();

export const gerarToken = (usuario) => {

    const payload = {
        _id: usuario._id,
        nome: usuario.nome,
        cargo: usuario.cargo,
        matricula: usuario.matricula,
        email: usuario.email
    }


    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
}