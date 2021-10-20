const express = require('express');
const router = express.Router();
const subcategoriesCtrl = require('../../Controllers/How2/sousCategories');
const multer = require('../../Config/multer-config');
const auth = require('../../middleware/auth'); 

/**
 * ROUTES
 */
// Requête POST nouvelle sous catégorie
router.post('/newsubcategorie', auth, multer, subcategoriesCtrl.createSubCategorie);

// Requêt PUT maj sous catégorie
router.put('/:id', auth, multer, subcategoriesCtrl.updateSubCategorie);

// Requête GET toutes les sous catégories
router.get('/getall', auth, subcategoriesCtrl.getAllSubCategories);

// Requête GET sous catégorie by id
router.get('/:id', auth, subcategoriesCtrl.getSubCategorieById);

// Requête GET sous catégorie by categorie id
router.get('/subcategoriebycategorie/:id', auth, subcategoriesCtrl.getSubCategorieByCategorieId);

// Requête DELETE sous catégorie by id
router.delete('/:id', auth, subcategoriesCtrl.deleteSousCategorieById);

/**
 * EXPORTS
 */
 module.exports = router;