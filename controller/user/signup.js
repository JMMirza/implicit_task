const { User } = require('../../model/user')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});
module.exports = async (req, res) => {
    try {
        if (req.body.password !== req.body.cpassword) return res.status(400).send({ message: 'Password doesnot match' });
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            dob: req.body.dob,
            password: req.body.password,

        })

        const token = user.generateAuthToken()
        const url = `http://localhost:3000/api/user/verify/${token}`;

        await transporter.sendMail({
            from: "edummy304@gmail.com",
            to: user.email,
            subject: 'Verify Account',
            html: `Thanks for registering. Please click <a href = '${url}'>here</a> to confirm your email.`
        })
        // const result = await user.save()
        return res.status(201).json({
            message: `Sent a verification email to ${user.email}.`,
            id: `${user._id}`,
            name: `${user.name}`,
            email: `${user.email}`
        });
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}
