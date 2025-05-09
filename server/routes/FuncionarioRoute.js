import express from 'express';

import {
    listarFuncionarios,
    criarFuncionario,
    obterFuncionario,
    atualizarFuncionario,
    deletarFuncionario
} from '../controllers/FuncionarioController.js';

const router = express.Router();

router.get('/listarFuncionarios', listarFuncionarios);
router.post('/criarFuncionario', criarFuncionario);
router.get('/obterFuncionario/:id', obterFuncionario);
router.put('/atualizarFuncionario/:id', atualizarFuncionario);
router.delete('/deletarFuncionario/:id', deletarFuncionario);

router.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada',
        caminho: req.originalUrl
    });
});

export default router;