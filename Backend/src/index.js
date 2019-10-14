const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://luiz:luiz@cluster0-jtjws.mongodb.net/ecommerce?retryWrites=true&w=majority', {
    useNewUrlParser: true
});


server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);