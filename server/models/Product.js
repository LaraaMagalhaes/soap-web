import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nome: {type:String, required:true},
    imagem: {type:String, required:false},
    unidades: {type:Number, required:true},
    categoria: {type:String, required:true}
});



module.exports =  mongoose.model('Produtos', productSchema);