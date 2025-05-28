import express from 'express';
import { autenticarToken } from '../middlewares/authMiddleware.js';


import {
    login,
    logout,
    listarFuncionarios,
    criarFuncionario,
    obterFuncionario,
    atualizarFuncionario,
    deletarFuncionario,
    atualizarSenha
} from '../controllers/FuncionarioController.js';

const router = express.Router();

// Rotas protegidas, nao precisa proteger
router.post('/login', login);
router.post('/logout', logout)


router.get('/listarFuncionarios', autenticarToken, listarFuncionarios);
router.post('/criarFuncionario', autenticarToken, criarFuncionario);
router.get('/obterFuncionario', autenticarToken, obterFuncionario);
router.put('/atualizarFuncionario/:_id', autenticarToken, atualizarFuncionario);
router.delete('/deletarFuncionario/:_id', deletarFuncionario);

router.put('/atualizarSenha/:_id', atualizarSenha);

router.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada',
        caminho: req.originalUrl
    });
});

export default router;