const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    disabled: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sales: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Product', ProductSchema);