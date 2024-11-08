const Contact = require('../models/Contact');

const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    // Validate data
    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Please fill all the fields' });
    }

    try {
        const newContact = new Contact({
            name,
            email,
            message,
        });

        // Save to database
        await newContact.save();
        res.status(201).json({ msg: 'Message received successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};
// GET method to retrieve all contact form submissions
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find(); // Fetch all contact form submissions from the database
        res.status(200).json(contacts); // Send the data as a response
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};


module.exports = {
    submitContactForm, getAllContacts,
};
