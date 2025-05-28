import mongoose from "mongoose";

// Subdocumento para cada produto do pedido
const produtoPedidoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  quantidade: { type: Number, required: true }
}, { _id: false });

// Pedido contendo apenas solicitante, produtos e data
const pedidoSchema = new mongoose.Schema({
  solicitante: { type: String, required: true }, // pode ser o nome ou o ID do funcionário logado
  data: { type: Date, default: Date.now },
  produtos: [produtoPedidoSchema]
});

export default mongoose.model("Pedido", pedidoSchema);
