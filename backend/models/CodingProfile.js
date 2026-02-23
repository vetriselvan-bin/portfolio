const mongoose = require('mongoose');

const CodingProfileSchema = new mongoose.Schema({
    platform: { type: String, required: true },
    username: { type: String, required: true },
    description: { type: String },
    icon: { type: String },
    color: { type: String },
    link: { type: String },
    stats: [
        {
            label: { type: String },
            value: { type: String }
        }
    ]
});

module.exports = mongoose.model('CodingProfile', CodingProfileSchema);
