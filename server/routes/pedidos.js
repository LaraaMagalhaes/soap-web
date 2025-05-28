import express from "express";
import { criarPedido, listarPedidos } from "../controllers/pedidoController.js";

const router = express.Router();

router.post("/criarPedido", criarPedido);
router.get("/listarPedidos", listarPedidos);

export default router;
