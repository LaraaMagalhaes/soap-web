import mongoose from "mongoose";

const produtoPedidoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  quantidade: { type: Number, required: true }
}, { _id: false });

const pedidoSchema = new mongoose.Schema({
  solicitante: { type: String, required: true }, 
  data: { type: Date, default: Date.now },
  produtos: [produtoPedidoSchema]
});

export default mongoose.model("Pedido", pedidoSchema);
