const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    nome:{type: String, required: true},
    funcao:{type: String, required: true},
    salario: {type: Number, requidred: true},
    mao_obra: {type: Number, required: true, default: 100}, // por hora
    cpf: {type: String, required: true, index: {unique: true}},
    rg: {type: String, required: true},
    endereco: { type: String, required: true},
    telefone: {type: Number, required: true},
    email: {type: String, required: true, index: {unique: true}}
})
    
module.exports = mongoose.model('Funcionario', esquema, 'funcionarios')