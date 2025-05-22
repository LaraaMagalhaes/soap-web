import Funcionario from '../models/Funcionario.js';
import jwt, { decode } from 'jsonwebtoken'
import { hashSenha, verificarSenha } from '../utils/bcrypt.js';
import { gerarToken } from '../utils/jwt.js';

export const login = async (req, res) => {
    const { matricula, senha } = req.body;

    try {
        const funcionario = await Funcionario.findOne({ matricula });
        if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado' });

        const senhaValida = await verificarSenha(senha, funcionario.senha);
        if (!senhaValida) return res.status(401).json({ message: 'Senha inválida' });

        const token = gerarToken(funcionario);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000
        })

        res.json({
            token, funcionario: {
                id: funcionario._id,
                nome: funcionario.nome,
                cargo: funcionario.cargo,
                matricula: funcionario.matricula
            }
        });
    } catch (error) {
        res.status(500).json({ erro: 'Erro no login', err: error.message });
    }
}

export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });

    res.status(200).json({ message: 'Logout realizado com sucesso' })

}

export const listarFuncionarios = async (req, res) => {
    const funcionarios = await Funcionario.find();
    try {
        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const criarFuncionario = async (req, res) => {
    const { nome, cargo, matricula, email, senha } = req.body;

    const senhaHash = await hashSenha(senha); // Criptografando a senha

    const novoFuncionario = new Funcionario({
        nome,
        cargo,
        matricula,
        email,
        senha: senhaHash
    });

    const matriculaExistente = await Funcionario.findOne({ matricula });
    if (matriculaExistente) {
        return res.status(400).json({ message: "Matrícula já cadastrada." });
    }

    console.log(req.body);
    try {
        await novoFuncionario.save();
        res.status(201).json(novoFuncionario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const obterFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.findById(req.usuario._id).select('-senha');

        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }

        res.json({funcionario})

    } catch (error) {
        console.error('Erro ao buscar perfil: ', error);
        res.status(401).json({ message: 'Token Inválido ou Expirado' })
    }
}

export const atualizarFuncionario = async (req, res) => {
    const { nome, cargo, matricula, email, senha } = req.body;
    const senhaHash = await hashSenha(senha);

    try {
        const funcionario = await Funcionario.findByIdAndUpdate(
            req.params._id,
            { nome, cargo, matricula, email, senha: senhaHash },
            { new: true }
        );

        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
        res.status(200).json(funcionario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletarFuncionario = async (req, res) => {
    const { id } = req.params;
    try {
        const funcionario = await Funcionario.findByIdAndDelete(id);
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
        res.status(200).json({ message: 'Funcionário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}