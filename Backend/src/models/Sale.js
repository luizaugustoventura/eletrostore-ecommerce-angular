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
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Schema.Types.Date,
    } 
}, {
    timestamps: true
});

module.exports = model('Sale', SaleSchema);