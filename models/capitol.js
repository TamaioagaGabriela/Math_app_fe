const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const capitolSchema = new Schema({
    titlu: {
        type: String,
        required: true
    },
    clasa: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Capitol', capitolSchema);