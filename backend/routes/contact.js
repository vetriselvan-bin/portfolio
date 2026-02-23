const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');

// @route   POST api/contact
// @desc    Submit a contact message
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const newMessage = new Message({
            name,
            email,
            subject,
            message,
        });

        const savedMessage = await newMessage.save();
        res.json(savedMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/contact
// @desc    Get all messages (Admin Only)
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/contact/:id
// @desc    Delete a message (Admin Only)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ msg: 'Message not found' });
        }

        await message.deleteOne();

        res.json({ msg: 'Message removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
