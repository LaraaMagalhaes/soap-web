import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nome: {type:String, required:true},
    imagem: {type:String, required:false},
    estoque: {type:Number, required:true},
    categoria: {type:String, required:true}
});

export default mongoose.model('Produto', productSchema);