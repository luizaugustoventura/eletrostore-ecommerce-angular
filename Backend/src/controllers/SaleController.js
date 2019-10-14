const Sale = require('../models/Sale');
const Person = require('../models/Person');
const Product = require('../models/Product');

module.exports = {

    async index(req, res) {
        if(req.query.search) {
            const inputName = req.query.search;

            const person = await Person.find({
                username: /.*inputName.*/
            });

            const product = await Product.find({
                name: /.*inputName.*/
            })

            if((person == '') || (product == '')) {
                return res.status(404).json({
                    success: false,
                    message: 'Failed at finding either the user or product'
                })
            }

            const sale = Sale.find({
                $or: [
                    { personId:  person._id },
                    { productId: product._id }
                ]
            })
            .then((sales) => {
                return res.status(200).json({
                    success: true,
                    sales
                });
            })
            .catch((error) => {
                console.log(error);
                return res.status(404).json({
                    success: false,
                    message: 'Could not find any sale'
                });
            });
            
        }
    },

    store(req, res) {
        if(req.body) {
            //Fazer um for verificando de os IDs existem
            const sale = req.body;

            Sale.create(sale)
            .then(sl => {
                return res.satus.json({
                    success: true,
                    saleId: sl._id
                });
            })
            .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Could not create sale'
                });
            });
        }
    }
}