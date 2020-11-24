const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    marca:{type:String, required:true},
    nome:{type:String, required:true},
    ano:{type:Number, required:true},
    placa:{type:String, required:true},
    cliente:{type:mongoose.ObjectId, ref:'Cliente', required:true}
})

module.exports = mongoose.model('Veiculo', esquema, 'veiculos')