import { hashSenha } from './bcrypt.js';

const gerar = async () => {
  const senha = 'anna123'; // A senha que você quer usar
  const hash = await hashSenha(senha);
  console.log('Hash gerado:', hash);
};

gerar();




