const UserService = require("../services/UserService");

class UserController {
    static async register (req, res) {
        try {
            const user = await UserService.register(req.body);
            res.status(201).json({ message: "Registration Succeeded", user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async verifiyEmail (req, res) {
        try {
            const { token } = req.query;
            const response = await UserService.verifyEmail(token);
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login (req, res) {
        try {
            const { email, password } = req.body;
            const { user, accessToken, refreshToken } = await UserService.login(email, password);
            res.status(200).json({ 
                message: "Successfully Login", 
                user,
                accessToken,
            refreshToken
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = UserController;