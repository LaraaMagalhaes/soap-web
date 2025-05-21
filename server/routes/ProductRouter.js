import multer from 'multer';
import express from 'express';
import path from 'path';

import {
    listarProdutos,
    criarProduto,
    obterProduto,
    atualizarProduto,
    deletarProduto,
    atualizarEstoque
} from '../controllers/ProductController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('uploads', 'produtos'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({storage});

router.get('/listarProdutos', listarProdutos);
router.post('/criarProduto', upload.single('imagem'), criarProduto);
router.get('/obterProduto/:id', obterProduto);
router.put('/atualizarProduto/:id', atualizarProduto);
router.delete('/deletarProduto/:id', deletarProduto);
router.put('/atualizarEstoque/:id', atualizarEstoque);

router.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada',
        caminho: req.originalUrl
    });
});

export default router;