import express from 'express';
import { listarBlocos, criarBloco } from '../controllers/BlocoController.js';

const router = express.Router();

router.get('/listarBlocos', listarBlocos);
router.post('/criarBloco', criarBloco);

export default router;
