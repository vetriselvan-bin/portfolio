const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true },
    category: { type: String, required: true }
});

module.exports = mongoose.model('Skill', SkillSchema);
