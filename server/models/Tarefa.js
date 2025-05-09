import mongoose from "mongoose";

const tarefaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now },
    dataEntrega: { type: Date, required: true },
    status: { type: String, enum: ['Pendente', 'Em andamento', 'Concluída'], default: 'Pendente' },
    matriculaFuncionario: { type: mongoose.Schema.Types.ObjectId, ref: 'Funcionario', required: true }
});

export default mongoose.model('Tarefa', tarefaSchema);