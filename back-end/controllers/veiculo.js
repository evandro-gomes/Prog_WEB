const Veiculo = require('../models/Veiculo')

const controller = {}

//Operação CREATE
controller.novo = async (req, res) => {
    try {
        await Veiculo.create(req.body)
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
    let dados = await Veiculo.find()
        .populate('cliente')
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
        let obj = await Veiculo.findById(id)

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
        let ret = await Veiculo.findByIdAndUpdate(id, req.body)
        
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
        let ret = await Veiculo.findByIdAndDelete(id, req.body)
        
        if(ret) res.status(204).end()
        else res.status(404).end()
    }  
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }  
}
module.exports = controller