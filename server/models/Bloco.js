import mongoose from 'mongoose';

const blocoSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true }
});

export default mongoose.model('Bloco', blocoSchema);
