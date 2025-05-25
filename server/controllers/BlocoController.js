import Bloco from '../models/Bloco.js';

export const listarBlocos = async (req, res) => {
  const blocos = await Bloco.find();
  res.json(blocos);
};

export const criarBloco = async (req, res) => {
  const { nome } = req.body;
  try {
    const novo = new Bloco({ nome });
    await novo.save();
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
