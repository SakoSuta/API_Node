const jwt = require('jsonwebtoken');

const SharedController = {
    GenerateToken: async (UserData) => {
    // Générer le jeton JWT

    const secretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign({ UserId: UserData.id }, secretKey, { expiresIn: '1h' });
    return token;
  },
};

module.exports = SharedController;