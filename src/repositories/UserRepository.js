const User = require('../models/user');

class UserRepository {
    static async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    static async findById(id) {
        return await User.findByPk(id);
    }

    static async createUser(data) {
        return await User.create(data);
    }
}

module.exports = UserRepository;