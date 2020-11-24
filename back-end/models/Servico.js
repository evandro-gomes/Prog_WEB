const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    cliente:{type:mongoose.ObjectId, ref:'Cliente', required:true},
    veiculo:{type:mongoose.ObjectId, ref:'Veiculo', required:true},
    funcionario:{type:mongoose.ObjectId, ref:'Funcionario', required:true},
    peca:{type:mongoose.ObjectId, ref:'Peca', required:true},
    descricao:{type: String, required: true},
    data_inicial:{type:Date, required:true},
    data_final:{
        type:Date, rewuired:true,
        validate:{
            validator: function(valor){
                return valor >= this.data_inicial
            },
            message: () => 'A data final deve ser maior ou igual à data inicial.'
        }
    },    
    dias_semana:[{
        type:String, required:true,
        enum:['dom','seg','ter','qua','qui','sex','sáb']
    }],
    hora_inicial:{type:String, required:true},
    hora_final:{type:String, required:true},
})

module.exports = mongoose.model('Servico', esquema, 'servicos')