const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String },
    location: { type: String },
    period: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['work', 'education', 'hackathon', 'certification'], default: 'work' }
});

module.exports = mongoose.model('Experience', ExperienceSchema);
