const UserRepository = require("../repositories/UserRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const crypto = require("crypto");
// setup nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});

class UserService {
    static async register(data) {
        const existingUser = await UserRepository.findByEmail(data.email);
        if (existingUser) throw new Error("Email already registered!");



        data.password = await bcrypt.hash(data.password, 10); // Hash password
        data.verificationToken = crypto.randomBytes(32).toString('hex');

        const user = await UserRepository.createUser(data);

        // Send email verification
        const verificationUrl =  `${process.env.BASE_URL}/api/auth/verify-email?token=${data.verificationToken}`;
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: user.email,
            subject: "Email Verification",
            html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`
        });

        return user;
    }

    static async verifyEmail(token) {
        const user = User.findOne({ where: { verificationToken: token }});
        if (!user) throw new Error("Invalid or expired verification token");

        user.verificationToken = null;
        user.verified = true;
        await user.save();
        return { message: "User successfully verified! "};
    }

    static async login(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (!user) throw new Error("User not found!");

        const isMatch = await bcrypt.compare(password, user.password); // Hash password
        if (!isMatch) throw new Error("Wrong password!");

        // Generate token
        const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

        await User.update({ refreshToken }, { where: { id: user.id } });

        return { user, accessToken, refreshToken };
    }
}

module.exports = UserService;