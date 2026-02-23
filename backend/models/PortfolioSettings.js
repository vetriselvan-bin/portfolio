const mongoose = require('mongoose');

const PortfolioSettingsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    profileImage: { type: String },
    resumeLink: { type: String },
    linkedin: { type: String },
    github: { type: String },
    devpost: { type: String },
    leetcode: { type: String },
    email: { type: String },
    aboutDescription: { type: String }
});

module.exports = mongoose.model('PortfolioSettings', PortfolioSettingsSchema);
