import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    estoque: {type:Number, required:true}
});


export default mongoose.model('Produtos', productSchema);