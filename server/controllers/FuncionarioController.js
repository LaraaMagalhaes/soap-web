import Funcionario from '../models/Funcionario.js';

export const listarFuncionarios = async (req, res) => { 
    const funcionarios = await Funcionario.find();
    try {
        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const criarFuncionario = async (req, res) => {

    const {nome, cargo, matricula, email, senha} = req.body;
    const novoFuncionario = new Funcionario({
        nome,
        cargo,
        matricula,
        email,
        senha
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
    const { id } = req.params;
    try {
        const funcionario = await Funcionario.findById(id);
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
        res.status(200).json(funcionario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const atualizarFuncionario = async (req, res) => {
    const { id } = req.params;
    try {
        const funcionario = await Funcionario.findByIdAndUpdate(id, req.body, { new: true });
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