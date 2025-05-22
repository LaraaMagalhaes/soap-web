import bcrypt from 'bcryptjs';

export const hashSenha = async (senha) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(senha, salt);
};

export const verificarSenha = async (senhaDigitada, senhaHash) =>{
    return await bcrypt.compare(senhaDigitada, senhaHash);
}