import Pedido from "../models/Pedido.js";
import Produto from "../models/Product.js";

export const criarPedido = async (req, res) => {
  const { solicitante, produtos } = req.body;

  if (!solicitante || !Array.isArray(produtos) || produtos.length === 0) {
    return res.status(400).json({ message: "Dados incompletos para criar o pedido." });
  }

  try {
    const novoPedido = new Pedido({ solicitante, produtos });
    await novoPedido.save();

    for (const item of produtos) {
      const { nome, quantidade } = item;

      const produto = await Produto.findOne({ nome });
      if (produto) {
        produto.estoque = Math.max(0, produto.estoque - quantidade);
        await produto.save();
      }
    }

    res.status(201).json(novoPedido);
  } catch (error) {
    console.error("Erro ao criar pedido e atualizar estoque:", error);
    res.status(500).json({ message: "Erro ao salvar pedido.", error: error.message });
  }
};


export const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ data: -1 });
    res.status(200).json(pedidos);
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({ message: "Erro ao buscar pedidos.", error: error.message });
  }
};
