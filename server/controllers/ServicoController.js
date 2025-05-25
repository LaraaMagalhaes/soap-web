import Servico from '../models/Servico.js';

export const listarServicos = async (req, res) => {
  const servicos = await Servico.find();
  res.json(servicos);
};

export const criarServico = async (req, res) => {
  const { nome, descricao } = req.body;
  try {
    const novo = new Servico({ nome, descricao });
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
