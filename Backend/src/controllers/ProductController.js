const Sale = require('../models/Sale');
const Product = require('../models/Product');

module.exports = {
    index(req, res) {
        if(req.query.admin) {
            Product.find({})
            .then((products) => {
                return res.status(200).json(products);
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Could not list products'
                });
            });
        }
        else {
            Product.find({ disabled: false })
            .then((products) => {
                return res.status(200).json(products);
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Could not list products'
                });
            });
        }
        
    },

    find(req, res) {
        if(req.query.id) {
            Product.findById(req.query.id)
            .then(prod => {
                return res.status(200).json({
                    success: true,
                    product: prod
                });
            })
            .catch(error => {
                console.log(error);
                return res.status(404).json({
                    success: false,
                    message: 'Could not find product'
                });
            });
        }
    },

    store(req, res) {
        const prod = req.body;
        
        Product.create(prod)
        .then((prod) => {
            return res.status(200).json({
                success: true,
                prod
            });
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: 'Could not store product',
                error: error
            });
        })
    },

    async update(req, res) {
        const product = req.body;

        Product.updateOne(
            { _id: product._id },
            { $set: {
                    name: product.name,
                    imageUrl: product.imageUrl, 
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    sales: product.sales
                } 
            },
            { upsert: true }, 
            (err) => {
                if(!err) {
                    return res.status(200).json({
                        success: true,
                        productId: product._id
                    });   
                }
                else {
                    console.log(err);
                    return res.status(500).json({
                        success: false,
                        message: 'Failed at updating product'
                    });
                }
            }
        );
        /*.then(prod => {
            return res.status(200).json({
                success: true,
                productId: prod._id
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: 'Failed at updating product'
            })
        })*/
    },

    async delete(req, res) {
        if(req.query._id) {
            let activeProduct = false;
            const sales = await Sale.find({}).then(s => {return s});
            await sales.forEach(s => {
                s.products.forEach(p => {
                    if(p.productId == req.query._id) 
                        activeProduct = true;
                });
            });

            if(activeProduct)
            {
                Product.updateOne(
                    { _id: req.query._id },
                    { $set: {
                            disabled: true,
                        } 
                    },
                    { upsert: true }, 
                    (err) => {
                        if(!err) {
                            return res.status(200).json({
                                success: true,
                                productId: req.query._id
                            });   
                        }
                        else {
                            console.log(err);
                            return res.status(500).json({
                                success: false,
                                message: 'Failed at deactivating product'
                            });
                        }
                    }
                );
            }
            else {
                Product.deleteOne({ _id: req.query._id })
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        productId: req.query._id
                    });
                })
                .catch((error) => {
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message: 'Could not delete product'
                    });
                });
            }
        }
    }

    
}