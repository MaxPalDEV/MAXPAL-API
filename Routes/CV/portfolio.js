const express = require('express');
const router = express.Router();
const portfolioCtrl = require('../../Controllers/CV/portfolio');
const multer = require('../../Config/multer-config');
const auth = require('../../middleware/auth');

/**
 * ROUTES
 */
// Requête POST nouveau portfolio
router.post('/newportfolio', auth, multer, portfolioCtrl.createPortfolio);

// Requête POST nouvelle image portfolio
router.post('/newimageportfolio', auth, multer, portfolioCtrl.addImageToPortfolio);

// Requête GET tous les items du portfolio
router.get('/getall', auth, portfolioCtrl.getAllPortfolio);

// Requête GET portfolio item by id
router.get('/:id', auth, portfolioCtrl.getPortfolioById);

// Requête GET image portfolio item by portfolio id
router.get('/imageportfolio/:id', auth, portfolioCtrl.getPortfolioImageById);

// Requête DELETE catégorie by id
router.delete('/:id', auth, portfolioCtrl.deletePortfolioById);

/**
 * EXPORTS
 */
 module.exports = router;
