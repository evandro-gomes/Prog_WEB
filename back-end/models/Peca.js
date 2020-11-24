const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    marca:{type:String, required:true},
    funcao:{type:String, required:true},
    compat:{type:String, required:true},
    valor:{type:Number, required: true}
})

module.exports = mongoose.model('Peca', esquema, 'Pecas')