const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rezolvareExercitiuSchema = new Schema(
    {
        exercitiu: {
            type: Schema.Types.ObjectId,
            ref: 'Exercitiu',
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            required: true
        },
        raspuns_user: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('RezolvareExercitiu', rezolvareExercitiuSchema);