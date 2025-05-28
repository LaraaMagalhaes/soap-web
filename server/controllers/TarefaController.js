import Tarefa from "../models/Tarefa.js";

export const listarTarefas = async (req, res) => {
    const tarefas = await Tarefa.find();
    try {
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const criarTarefa = async (req, res) => {


    const { nome, descricao, bloco, data, horario, status, idFuncionario, nomeFuncionario } = req.body;
    const novaTarefa = new Tarefa({
        nome,
        descricao,
        bloco,
        data,
        horario,
        status,
        idFuncionario,
        nomeFuncionario
    });

    console.log(req.body);
    try {
        await novaTarefa.save();
        res.status(201).json(novaTarefa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const obterTarefa = async (req, res) => {
    const { id } = req.params;
    try {
        const tarefa = await Tarefa.findById(id);
        if (!tarefa) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const atualizarTarefa = async (req, res) => {
    const { id } = req.params;
    try {
        const tarefa = await Tarefa.findByIdAndUpdate(id, req.body, { new: true });
        if (!tarefa) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletarTarefa = async (req, res) => {
    const { id } = req.params;
    try {
        const tarefa = await Tarefa.findByIdAndDelete(id);
        if (!tarefa) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

