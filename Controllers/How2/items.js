/**
 * IMPORTS
 */
 const database = require('../../Config/database');
 const fs = require('fs'); // Permet de supprimer les images à la suppression d'un objet

 /**
  * Requête POST de création d'un item
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
 exports.createItem = (req, res, next) => {
    values = [[req.body.titre, req.body.contenu, req.body.isImportant, req.body.isPinged, req.body.subcategorie_id, req.body.user_id]];
    database.query("INSERT INTO how2_item (titre, contenu, isImportant, isPinged, subcategorie_id, user_id) VALUES ?",[values], function (err, result) {
        if (err) throw err;
        console.log("Item ajouté !")
    })
    res.status(201).json({ message: 'Item créé avec succès !'})
 };

  /**
 * Mise à jour de la sous catégorie par ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateItem = (req, res, next) => {  
        values = [req.body.titre, req.body.contenu, req.body.isImportant, req.body.isPinged, req.body.subcategorie_id, req.body.user_id, req.params.id];
  
    database.query("UPDATE how2_item SET titre =?, contenu=?, isImportant=?, isPinged=?, subcategorie_id=?, user_id=? WHERE id=?",values, function (err, result) {
        if (err) throw err;
        console.log("Item modifié !");
    })
    res.status(201).json({ message: 'Item modifié avec succès !'})
 };

 exports.getItemsBySubCategorieId = (req, res, next) => {     
    database.query("SELECT * FROM how2_item WHERE subcategorie_id=? AND isImportant=false ORDER BY isPinged DESC", [req.params.id], function (err, result) {
        if (err) throw err;
        res.status(200).json(result)
    });
 };

 exports.getItemsImportant = (req, res, next) => {     
    database.query("SELECT * FROM how2_item WHERE isImportant=true AND subcategorie_id=?", [req.params.id], function (err, result) {
        if (err) throw err;
        res.status(200).json(result)
    });
 };

  /**
  * Récupération d'une sous catégorie via ID
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
   exports.getItemById = (req, res, next) => {     
    database.query("SELECT * FROM how2_item WHERE id=?", [req.params.id], function (err, result) {
        if (err) throw err;
        res.status(200).json(result)
    });
 };

  /**
  * Suppression d'un item by id
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
   exports.deleteItemById = (req, res, next) => {  

       test = database.query("DELETE FROM how2_item WHERE id=?", [req.params.id], function (err, result) {
            if (err) throw err;
            console.log("Item supprimé !");
        });
         
    res.status(201).json({ message: 'Item supprimé avec succès !'})
 };

/**
 * Récupération des 3 derniers items
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.getLastItems = (req, res, next) => {     
    database.query("SELECT * FROM how2_item ORDER BY id DESC LIMIT 3", function (err, result) {
        if (err) throw err;
        res.status(200).json(result)
    });
 };

