/**
 * IMPORTS
 */
const express = require('express');
const router = express.Router();

const contactCtrl = require('../../Controllers/CV/contact');

/**
 * REQUÊTES
 */

// POST - Envoi du formulaire de contact
router.post('/', contactCtrl.sendMail);

module.exports = router;