import mongoose from 'mongoose';

const funcionarioSchema = new mongoose.Schema({
    funcionarioId: {type:String, required:true, unique:true},
    name: {type:String, required:true},
    cargo: {type:String, required:true},
    matricula: {type:String, required:true, unique:true}
});

export default mongoose.model('Funcionario', funcionarioSchema);