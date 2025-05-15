import Product from "../models/Product.js";

export const listarProdutos = async (req, res) => {
    const produtos = await Product.find();
    try {
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const criarProduto = async (req, res) => {
    const { nome, unidades, categoria } = req.body;
    const imagem = req.file ? `uploads/${req.file.filename}` : `client/assets/images/noimage.png`;

    const novoProduto = new Product({
        nome,
        imagem,
        unidades,
        categoria
    });

    const produto = await Product.findOne({ nome });
        if (produto) {
            return res.status(400).json({ message: "Produto já cadastrado" });
        }

    try {
        await novoProduto.save();
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const obterProduto = async (req, res) => {
    const { id } = req.params;
    try {
        const produto = await Product.findById(id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    try {
        const produto = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletarProduto = async (req, res) => {
    const { id } = req.params;
    try {
        const produto = await Product.findByIdAndDelete(id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const atualizarEstoque = async (req, res) => {
    const { id } = req.params;
    const { estoque } = req.body;

    try {
        const produto = await Product.findByIdAndUpdate(id, { estoque }, { new: true });
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}