const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PortfolioSettings = require('../models/PortfolioSettings');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const CodingProfile = require('../models/CodingProfile');

// ==========================================
// PORTFOLIO SETTINGS
// ==========================================

// @route   GET api/portfolio/settings
// @desc    Get portfolio settings
// @access  Public
router.get('/settings', async (req, res) => {
    try {
        let settings = await PortfolioSettings.findOne();
        if (!settings) {
            // Return empty object or default if none exist
            return res.json({});
        }
        res.json(settings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/portfolio/settings
// @desc    Update or create portfolio settings
// @access  Private (Admin)
router.put('/settings', auth, async (req, res) => {
    try {
        let settings = await PortfolioSettings.findOne();
        if (settings) {
            settings = await PortfolioSettings.findOneAndUpdate(
                {},
                { $set: req.body },
                { new: true }
            );
        } else {
            settings = new PortfolioSettings(req.body);
            await settings.save();
        }
        res.json(settings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ==========================================
// PROJECTS
// ==========================================

// @route   GET api/portfolio/projects
// @desc    Get all projects
// @access  Public
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ _id: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/portfolio/projects
// @desc    Add new project
// @access  Private (Admin)
router.post('/projects', auth, async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/portfolio/projects/:id
// @desc    Update project
// @access  Private (Admin)
router.put('/projects/:id', auth, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/portfolio/projects/:id
// @desc    Delete project
// @access  Private (Admin)
router.delete('/projects/:id', auth, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ==========================================
// SKILLS
// ==========================================

// @route   GET api/portfolio/skills
// @desc    Get all skills
// @access  Public
router.get('/skills', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ category: 1 });
        res.json(skills);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/portfolio/skills
// @desc    Add new skill
// @access  Private (Admin)
router.post('/skills', auth, async (req, res) => {
    try {
        const newSkill = new Skill(req.body);
        const skill = await newSkill.save();
        res.json(skill);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/portfolio/skills/:id
// @desc    Update skill
// @access  Private (Admin)
router.put('/skills/:id', auth, async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(skill);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/portfolio/skills/:id
// @desc    Delete skill
// @access  Private (Admin)
router.delete('/skills/:id', auth, async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Skill removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ==========================================
// EXPERIENCE (Education, Hackathons, Certs)
// ==========================================

// @route   GET api/portfolio/experience
// @desc    Get all experience items
// @access  Public
router.get('/experience', async (req, res) => {
    try {
        const items = await Experience.find().sort({ period: -1 });
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/portfolio/experience
// @desc    Add new experience item
// @access  Private (Admin)
router.post('/experience', auth, async (req, res) => {
    try {
        const newItem = new Experience(req.body);
        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/portfolio/experience/:id
// @desc    Update experience item
// @access  Private (Admin)
router.put('/experience/:id', auth, async (req, res) => {
    try {
        const item = await Experience.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/portfolio/experience/:id
// @desc    Delete experience item
// @access  Private (Admin)
router.delete('/experience/:id', auth, async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ==========================================
// CODING PROFILES
// ==========================================

// @route   GET api/portfolio/profiles
// @desc    Get all coding profiles
// @access  Public
router.get('/profiles', async (req, res) => {
    try {
        const profiles = await CodingProfile.find().sort({ platform: 1 });
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/portfolio/profiles
// @desc    Add new coding profile
// @access  Private (Admin)
router.post('/profiles', auth, async (req, res) => {
    try {
        const newProfile = new CodingProfile(req.body);
        const profile = await newProfile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/portfolio/profiles/:id
// @desc    Update coding profile
// @access  Private (Admin)
router.put('/profiles/:id', auth, async (req, res) => {
    try {
        const profile = await CodingProfile.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/portfolio/profiles/:id
// @desc    Delete coding profile
// @access  Private (Admin)
router.delete('/profiles/:id', auth, async (req, res) => {
    try {
        await CodingProfile.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Profile removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
