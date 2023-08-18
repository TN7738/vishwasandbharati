const mongoose = require('mongoose');

const collectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    restrictions: {
        type: String,
        required: false
    },
    msg: {
        type: String,
        required: false
    },
    guests: {
        type: [String],
        required: false
    },
    email: {
        type: String,
        required: false
    }
});

mongoose.model('Collect', collectSchema);