const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

const server = express();

mongoose.connect('sua_string_de_conexao', {
    useNewUrlParser: true
});


server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);