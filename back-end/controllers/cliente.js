const Cliente = require('../models/Cliente')

const controller = {}

//Operação CREATE
controller.novo = async (req, res) => {
    try {
        await Cliente.create(req.body)
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
    let dados = await Cliente.find()
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
        let obj = await Cliente.findById(id)

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
        let ret = await Cliente.findByIdAndUpdate(id, req.body)
        
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
        let ret = await Cliente.findByIdAndDelete(id, req.body)
        
        if(ret) res.status(204).end()
        else res.status(404).end()
    }  
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }  
}
module.exports = controller