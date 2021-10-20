/**
 * IMPORTS
 */
 const express = require('express');
 const router = express.Router();
 const userCtrl = require('../../Controllers/PMPanel/user');
 const multer = require('../../Config/multer-config');
 const auth = require('../../middleware/auth'); 

 /**
 * ROUTES
 */
// Requête POST d'inscription
router.post('/signup', auth, multer, userCtrl.signup);

// Requête POST de connexion
router.post('/login', userCtrl.login);

// Requête GET de récupération du nom du rôle
router.post('/getrole', userCtrl.getUserRole);

/**
 * EXPORTS
 */
 module.exports = router;