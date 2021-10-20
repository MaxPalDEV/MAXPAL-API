const express = require('express');
const router = express.Router();
const categoriesCtrl = require('../../Controllers/How2/categories');
const multer = require('../../Config/multer-config');
const auth = require('../../middleware/auth'); 

/**
 * ROUTES
 */
// Requête POST nouvelle catégorie
router.post('/newcategorie', auth, multer, categoriesCtrl.createCategorie);

// Requêt PUT maj catégorie
router.put('/:id', auth, multer, categoriesCtrl.updateCategorie);

// Requête GET toutes les catégories
router.get('/getall', auth, categoriesCtrl.getAllCategories);

// Requête GET catégorie by id
router.get('/:id', auth, categoriesCtrl.getCategorieById);

// Requête DELETE catégorie by id
router.delete('/:id', auth, categoriesCtrl.deleteCategorieById);

/**
 * EXPORTS
 */
 module.exports = router;