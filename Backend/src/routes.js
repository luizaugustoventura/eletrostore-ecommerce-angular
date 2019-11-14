const express = require('express');
const ProductController = require('./controllers/ProductController');
const PersonController = require('./controllers/PersonController');
const SaleController = require('./controllers/SaleController');
const LoginController = require('./controllers/LoginController');

const routes = express.Router();

//PRODUCTS
routes.get('/product', ProductController.find);
routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.put('/products', ProductController.update);
routes.delete('/products', ProductController.delete);

//PEOPLE
routes.get('/person', PersonController.find);
routes.get('/people', PersonController.index);
routes.post('/people', PersonController.store);
routes.put('/people', PersonController.update);
routes.delete('/people', PersonController.delete);

//SALES
routes.get('/sales', SaleController.index);
routes.post('/sales', SaleController.store);


//LOGIN
routes.post('/login/login', LoginController.login);
routes.post('/login/signin', LoginController.store);

module.exports = routes;
