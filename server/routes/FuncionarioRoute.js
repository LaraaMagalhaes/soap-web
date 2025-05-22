import express from 'express';
import { autenticarToken } from '../middlewares/authMiddleware.js';


import {
    login,
    logout,
    listarFuncionarios,
    criarFuncionario,
    obterFuncionario,
    atualizarFuncionario,
    deletarFuncionario
} from '../controllers/FuncionarioController.js';

const router = express.Router();

// Rotas protegidas
router.post('/login', login);
router.post('/logout', logout)

router.get('/listarFuncionarios', autenticarToken, listarFuncionarios);
router.post('/criarFuncionario', autenticarToken, criarFuncionario);
router.get('/obterFuncionario', autenticarToken, obterFuncionario);
router.put('/atualizarFuncionario/:id', atualizarFuncionario);
router.delete('/deletarFuncionario/:id', deletarFuncionario);

router.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada',
        caminho: req.originalUrl
    });
});

export default router;