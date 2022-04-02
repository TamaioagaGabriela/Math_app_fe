const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accesareTeorieSchema = new Schema(
    {
        teorie: {
            type: Schema.Types.ObjectId,
            ref: 'Teorie',
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

module.exports = mongoose.model('AccesareTeorie', accesareTeorieSchema);