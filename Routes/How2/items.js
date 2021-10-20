const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../Controllers/How2/items');
const multer = require('../../Config/multer-config');
const auth = require('../../middleware/auth'); 

/**
 * ROUTES
 */

// Requête POST nouvel item
router.post('/newitem', auth, multer, itemsCtrl.createItem);

// Requête GET 3 lastest items
router.get('/getlast', auth, itemsCtrl.getLastItems);

// Requête GET all items by item id
router.get('/getallitemsbysouscategorieid/:id', auth, itemsCtrl.getItemsBySubCategorieId);

// Requête GET items importants
router.get('/getitemsimportant/:id', auth, itemsCtrl.getItemsImportant);

// Requête GET item by id
router.get('/:id', auth, itemsCtrl.getItemById);

// Requête DELETE item by id
router.delete('/:id', auth, itemsCtrl.deleteItemById);

// Requêt PUT maj item
router.put('/:id', auth, multer, itemsCtrl.updateItem);

/**
 * EXPORTS
 */
 module.exports = router;