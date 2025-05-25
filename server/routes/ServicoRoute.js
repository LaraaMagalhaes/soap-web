import express from 'express';
import { listarServicos, criarServico } from '../controllers/ServicoController.js';

const router = express.Router();

router.get('/listarServicos', listarServicos);
router.post('/criarServico', criarServico);

export default router;
