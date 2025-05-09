import Admin from "../models/Admin.js";

export const criarAdmin = async (req, res) => {
    const { name, cargo, matricula, email, password } = req.body;
    const novoAdmin = new Admin({
        name,
        cargo,
        matricula,
        email,
        password
    });

    const matriculaExistente = await Admin.findOne({ matricula });
    if (matriculaExistente) {
        return res.status(400).json({ message: "Matrícula já cadastrada." });
    }

    try {
        await novoAdmin.save();
        res.status(201).json(novoAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deletarAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByIdAndDelete(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin não encontrado' });
        }
        res.status(200).json({ message: 'Admin deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const atualizarAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
        if (!admin) {
            return res.status(404).json({ message: 'Admin não encontrado' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}