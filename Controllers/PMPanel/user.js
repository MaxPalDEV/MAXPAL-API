/**
 * IMPORTS
 */
 const bcrypt = require('bcrypt');
 const database = require('../../Config/database');
 const jwt = require('jsonwebtoken');

/**
 * Requête d'inscription d'un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10) // Cryptage du mot de passe
        .then(hash => {
            values = [[req.body.pseudo, hash, `${req.protocol}://${req.get('host')}/images/${req.file.filename}`]];
            database.query("INSERT INTO users (pseudo, password, imageUrl) VALUES ?",[values], function (err, result) {
                if (err) throw err;
                console.log("Utilisateur ajouté !")
            })
            res.status(201).json({ message: 'Utilisateur créé avec succès !'})
        })
 };

 /**
  * Requête de connexion de l'utilisateur
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
 exports.login = (req, res, next) => {
     database.query("SELECT * FROM users WHERE pseudo =" + database.escape(req.body.pseudo), function (err, result) {       
        if (err){
            throw err;       
        }
        if (result == "" ) {
            return res.status(401).json({error: "Le pseudo renseigné n'existe pas..."});
        }
        Object.keys(result).forEach(function(key) { // Récupère le résultat pour le stocker dans la variable row            
            var row = result[key];
            bcrypt.compare(req.body.password, row.password) // compare les hash
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: "Le mot de passe est incorrect..."});
                    }else{

                        res.status(200).json({
                            user: row,
                            token: jwt.sign(
                                { userInformations: row.id },
                                'SecretToken',
                                { expiresIn: '24h' }
                            )
                        });
                    }
                })
                .catch(error => res.status(500).json({ error }));
          });
     });
     
 }

 /**
  * Récupérer le rôle de l'utilisateur
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
 exports.getUserRole = (req, res, next) => {
    database.query("SELECT name FROM userlevel WHERE id="+ database.escape(req.body.idrole), function (err, result) {       
        if (err){
            throw err;       
        } 
        Object.keys(result).forEach(function(key) { // Récupère le résultat pour le stocker dans la variable row            
            var row = result[key];
            res.status(200).json({
                namerole: row,           
            });
        });
    });

 }
