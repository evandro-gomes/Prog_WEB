const Funcionario = require('../models/Funcionario')

const controller = {}

//Operação CREATE
controller.novo = async (req, res) => {
    try {
        await Funcionario.create(req.body)
        res.status(201).end()
    }
    catch(erro) {
        console.log(erro)
        res.status(500).send(erro)
    }
}

//Operação RETRIEVE(all)
controller.listar = async (req, res) => {
    try{
    let dados = await Funcionario.find()
    res.send(dados)
    }
    catch(erro){
        console.log(erro)
        res.status(500).send
    }
}

//Operação RETRIEVE(one)
controller.obterUm = async (req, res) => {
    try{
        const id = req.params.id
        let obj = await Funcionario.findById(id)

        if(obj) res.send(obj)
        else res.status(404).end()
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

//Operação UPDATE
controller.atualizar = async (req, res) =>{
    try{
        const id = req.body._id
        let ret = await Funcionario.findByIdAndUpdate(id, req.body)
        
        if(ret) res.status(204).end()
        else res.status(404).end()
    }  
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }  
}

//Operação DELETE
controller.excluir = async (req, res) =>{
    try{
        const id = req.body._id
        let ret = await Funcionario.findByIdAndDelete(id, req.body)
        
        if(ret) res.status(204).end()
        else res.status(404).end()
    }  
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }  
}
module.exports = controller