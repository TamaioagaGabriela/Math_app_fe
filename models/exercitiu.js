const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exercitiuSchema = new Schema({
    subcapitol_id: {
        type: Schema.Types.ObjectId,
        ref: 'Subcapitol',
        required: true
    },
    rezolvare: {
        type: String,
        required: true
    },
    varianta1: {
        type: String,
        required: true
    },
    varianta2: {
        type: String,
        required: true
    },
    varianta3: {
        type: String,
        required: true
    },
    varianta4: {
        type: String,
        required: true
    },
    raspuns_corect: {
        type: String,
        required: true
    },
    nivel_dif: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Exercitiu', exercitiuSchema);