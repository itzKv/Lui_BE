const UserRepository = require("../repositories/UserRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

class UserService {
    static async register(data) {
        const existingUser = await UserRepository.findByEmail(data.email);
        if (existingUser) throw new Error("Email already registered!");

        data.password = await bcrypt.hash(data.password, 10); // Hash password
        return await UserRepository.createUser(data);
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