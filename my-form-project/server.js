const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3001; // You can keep this or change it to 3000 if you want

// Middleware for parsing JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Configure the email transporter
const transporter = nodemailer.createTransport({
    host: 'mail-serwer320059.lh.pl', // Your SMTP server
    port: 465, // SMTP port with SSL
    secure: true, // Use SSL
    auth: {
        user: 'info@hiresolutions.org', // Your email
        pass: 'MKDoFsDK68b8e!5I', // Your password
    }
});

// Handle POST requests to "/submit-form"
app.post('/submit-form', (req, res) => {
    const { 'first-name': firstName, 'last-name': lastName, email, phone, 'additional-info': additionalInfo } = req.body;

    // Set up the email options
    const mailOptions = {
        from: 'info@hiresolutions.org', // Your email
        to: 'biuro@hiresolutions.org', // Replace with the recipient's email
        subject: 'New Form Submission',
        text: `You have a new form submission:

First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone: ${phone}
Additional Information: ${additionalInfo}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send({ message: 'Error sending email', error });
        }
        console.log('Email sent:', info.response);
        res.status(200).send({ message: 'Form submitted successfully!', data: req.body });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
