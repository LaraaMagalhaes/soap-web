import mongoose from "mongoose";

const tarefaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    bloco: {  type: String, required: true },
    data: { type: Date, default: Date.now },
    horario: { type: String, required: true },
    status: { type: String, required: false },
    idFuncionario: { type: mongoose.Schema.Types.ObjectId, ref: 'Funcionario', required: true },
    nomeFuncionario: { type: String, required: true },
});

export default mongoose.model('Tarefa', tarefaSchema);