const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: [{ type: String }],
    github: { type: String },
    live: { type: String },
    image: { type: String },
    icon: { type: String }
});

module.exports = mongoose.model('Project', ProjectSchema);
