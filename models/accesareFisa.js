const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accesareFisaSchema = new Schema(
    {
        fisa: {
            type: Schema.Types.ObjectId,
            ref: 'FisaFormule',
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('AccesareFisa', accesareFisaSchema);