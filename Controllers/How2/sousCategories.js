/**
 * IMPORTS
 */
 const database = require('../../Config/database');
 const fs = require('fs'); // Permet de supprimer les images à la suppression d'un objet

 /**
 * Création d'une sous catégorie
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createSubCategorie = (req, res, next) => {
    values = [[req.body.name, req.body.description, `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, req.body.id]];
    database.query("INSERT INTO how2_subcategories (name, description, logo, categories_id) VALUES ?",[values], function (err, result) {
        if (err) throw err;
        console.log("Sous catégorie ajoutée !")
    })
    res.status(201).json({ message: 'Sous catégorie créée avec succès !'})
 };

 /**
 * Mise à jour de la sous catégorie par ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateSubCategorie = (req, res, next) => {  
    if (req.file) {
        values = [req.body.name, req.body.description, `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, req.body.idCategorie, req.body.id];
    } else {
        values = [req.body.name, req.body.description, req.body.image, req.body.idCategorie, req.body.id];
    }     
    database.query("UPDATE how2_subcategories SET name =?, description=?, logo=?, categories_id=? WHERE id=?",values, function (err, result) {
        if (err) throw err;
        console.log("Catégorie modifiée !");
    })
    res.status(201).json({ message: 'Catégorie modifiée avec succès !'})
 };

  /**
  * Récupération de l'ensemble des sous catégories
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
   exports.getAllSubCategories = (req, res, next) => {       
    database.query("SELECT * FROM how2_subcategories", function (err, result) {
        if (err) throw err;
        res.status(200).json(result)
    });
 };

  /**
  * Récupération d'une catégorie via ID
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
   exports.getSubCategorieByCategorieId = (req, res, next) => {     
    database.query("SELECT * FROM how2_subcategories WHERE categories_id=?", [req.params.id], function (err, result) {
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
   exports.getSubCategorieById = (req, res, next) => {     
    database.query("SELECT * FROM how2_subcategories WHERE id=?", [req.params.id], function (err, result) {
        if (err) throw err;
        res.status(200).json(result)
    });
 };

 /**
  * Suppression d'une sous catégorie by id
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
 exports.deleteSousCategorieById = (req, res, next) => {  
    database.query("SELECT * FROM how2_subcategories WHERE id=?", [req.params.id], function (err, result) {
        if (err) throw err;

        Object.keys(result).forEach(function(key) { // Récupère le résultat pour le stocker dans la variable row            
            var row = result[key];

            const filename = row.logo.split('/images')[1];
            fs.unlink(`images/${filename}`, () => { // suppression du fichier grace au nom
                database.query("DELETE FROM how2_subcategories WHERE id=?", [req.params.id], function (err, result) {
                    if (err) throw err;
                    console.log("Sous Catégorie supprimée !");
                });
            })            
        });       
    });   
    res.status(201).json({ message: 'Sous Catégorie supprimée avec succès !'})
 };