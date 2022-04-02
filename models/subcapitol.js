const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subcapitolSchema = new Schema({
    capitol_id: {
        type: Schema.Types.ObjectId,
        ref: 'Capitol',
        required: true
    },
    titlu: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Subcapitol', subcapitolSchema);