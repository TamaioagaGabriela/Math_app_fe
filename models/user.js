const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    parola: {
        type: String,
        required: true
    },
    nume: {
        type: String,
        required: true
    },
    prenume: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    email_tutore: {
        type: String,
        required: true
    },
    clasa: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);