const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Spliter le token
        const decodedToken = jwt.verify(token,process.env.TOKEN); // Décoder le token
        const userId = decodedToken.userInformations;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        }else{
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' }); // Gestion de l'erreur
    }
}