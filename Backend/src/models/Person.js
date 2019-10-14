const { Schema, model } = require('mongoose');

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    disabled: {
        type: Boolean,
        required: true  
    },
    address: {
        type: String 
    },
    number: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: String
    },
    neighborhood: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = model('Person', PersonSchema);