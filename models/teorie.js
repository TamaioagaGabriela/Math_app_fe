const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teorieSchema = new Schema({
    subcapitol_id: {
        type: Schema.Types.ObjectId,
        ref: 'Subcapitol',
        required: true
    },
    titlu: {
        type: String,
        required: true
    },
    descriere: {
        type: String,
        required: false
    },
    link_video: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Teorie', teorieSchema);