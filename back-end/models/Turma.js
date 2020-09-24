const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    nome:{type:String, required:true},
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
    // Valores que usam apenas a parte de hora de uma data
    // são manipulads amais facilmente como String
    horario_inicial:{type:String, required:true},
    horario_final:{type:String, required:true},
    curso:{type:mongoose.ObjectId, ref:'Curso', required:true},
    professor:{type:mongoose.ObjectId, ref:'Professor', required:true},
    sala_aula:{type:mongoose.ObjectId, ref:'SalaAula', required:true}
})

module.exports = mongoose.model('Turma', esquema, 'turmas')