import mongoose from 'mongoose';

const funcionarioSchema = new mongoose.Schema({
    nome: {type:String, required:true},
    cargo: {type:String, required:true},
    matricula: {type:String, required:true, unique:true},
    email: {type:String, required:true},
    senha: {type:String, required:true}
});


export default mongoose.model('Funcionario', funcionarioSchema);