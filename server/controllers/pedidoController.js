import Pedido from "../models/Pedido.js";

// Criar um novo pedido
export const criarPedido = async (req, res) => {
  const { solicitante, produtos } = req.body;

  if (!solicitante || !Array.isArray(produtos) || produtos.length === 0) {
    return res.status(400).json({ message: "Dados incompletos para criar o pedido." });
  }

  try {
    const novoPedido = new Pedido({ solicitante, produtos });
    await novoPedido.save();
    res.status(201).json(novoPedido);
  } catch (error) {
    res.status(500).json({ message: "Erro ao salvar pedido.", error: error.message });
  }
};

// Listar todos os pedidos
export const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ data: -1 });
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pedidos.", error: error.message });
  }
};
