const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testSchema = new Schema({
    capitol_id: {
        type: Schema.Types.ObjectId,
        ref: 'Capitol',
        required: true
    },
    exercitiu1_id: {
        type: Schema.Types.ObjectId,
        ref: 'Exercitiu1',
        required: true
    },
    exercitiu2_id: {
        type: Schema.Types.ObjectId,
        ref: 'Exercitiu2',
        required: true
    },
    exercitiu3_id: {
        type: Schema.Types.ObjectId,
        ref: 'Exercitiu3',
        required: true
    },
    exercitiu4_id: {
        type: Schema.Types.ObjectId,
        ref: 'Exercitiu4',
        required: true
    },
    exercitiu5_id: {
        type: Schema.Types.ObjectId,
        ref: 'Exercitiu5',
        required: true
    },
    exercitiu6_id: {
        type: Schema.Types.ObjectId,
        ref: 'Exercitiu6',
        required: true
    },
    exercitiu7_id: {
        type: Schema.Types.ObjectId,
        ref: 'Exercitiu7',
        required: true
    },
    exercitiu8_id: {
        type: Schema.Types.ObjectId,
        ref: 'Exercitiu8',
        required: true
    },
    exercitiu9_id: {
        type: Schema.Types.ObjectId,
        ref: 'Exercitiu9',
        required: true
    }
});

module.exports = mongoose.model('Test', testSchema);