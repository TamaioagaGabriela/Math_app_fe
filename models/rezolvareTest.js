const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rezolvareTestSchema = new Schema(
    {
        test: {
            type: Schema.Types.ObjectId,
            ref: 'Test',
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        punctaj: {
            type: String,
            required: true
        },
        raspunsuri_user: {
            type: [String],
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('RezolvareTest', rezolvareTestSchema);