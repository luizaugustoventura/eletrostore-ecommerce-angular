const { model, Schema } = require('mongoose');

const SaleSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    },{
        quantity: {
            type: Number,
            required: true
        }
    }] 
}, {
    timestamps: true
});

module.exports = model('Sale', SaleSchema);