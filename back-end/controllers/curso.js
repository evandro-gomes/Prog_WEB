const Curso = require('../models/Curso')

const controller = {}

//Operação CREATE
controller.novo = async (req, res) => {
    //usa os dados que chegam dentro do body da aquisição
    //e os envia o BD para criação de um novo objeto
    try {
        await Curso.create(req.body)
        // HTTP 201: Created
        res.status(201).end()
    }
    catch(erro) {
        console.log(erro)
        // HTTP 500: Internal Server Error
        res.status(500).send(erro)
    }
}

//Operação RETRIEVE(all)
controller.listar = async (req, res) => {
    try{
    let dados = await Curso.find() //Tras todos os cursos cadastrados
    res.send(dados) // Vai com status HTTP 200: OK
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
        let obj = await Curso.findById(id)

        if(obj) res.send(obj)
        else res.status(404).end()
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

module.exports = controller