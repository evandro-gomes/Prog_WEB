const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    nome:{type: String, required: true},
    cpf: {type: String, required: true, index: {unique: true}},
    rg: {type: String, required: true},
    endereco: { type: String, required: true},
    telefone: {type: Number, required: true},
    email: {type: String, required: true, index: {unique: true}}
})
    
module.exports = mongoose.model('Cliente', esquema, 'clientes')