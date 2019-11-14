const { model, Schema } = require('mongoose');

const SaleSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }] 
}, {
    timestamps: true
});

module.exports = model('Sale', SaleSchema);