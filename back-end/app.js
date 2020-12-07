var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const db = require ('./config/database')
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbName = process.env.DB_NAME  
db(`mongodb+srv://${dbUser}:${dbPass}@cluster0.cxhx5.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`)

var app = express();

const cors = require('cors')
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const teste = require('./routes/teste')
app.use('/teste', teste)

const cliente = require('./routes/cliente')
app.use('/cliente', cliente)

const funcionario = require('./routes/funcionario')
app.use('/funcionario', funcionario)

const peca = require('./routes/peca')
app.use('/peca', peca)

const servico = require('./routes/servico')
app.use('/servico', servico)

const veiculo = require('./routes/veiculo')
app.use('/veiculo', veiculo)

module.exports = app;
