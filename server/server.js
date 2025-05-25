import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import path from 'path';
import cookieParser from 'cookie-parser';

// Importando as rotas
import funcionarioRoute from './routes/FuncionarioRoute.js';
import tarefaRoute from './routes/TarefaRoute.js';
import adminRoute from './routes/AdminRoute.js';
import productRoute from './routes/ProductRouter.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json());
app.use('/uploads', express.static(path.join('..assets/images/uploads')));
app.use(cookieParser());




// Rota raiz
app.get('/', (req, res) => {
    res.send('API SOAP-web');
  });


// Rota para listar funcionários
app.use('/api/funcionarios', funcionarioRoute);

// Rota para listar tarefas
app.use('/api/tarefas', tarefaRoute);

// Rota para listar administradores
app.use('/api/admin', adminRoute);

// Rota para listar produtos
app.use('/api/produtos', productRoute);


// Rota coringa: deve ser a **última**
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    caminho: req.originalUrl
  });
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});