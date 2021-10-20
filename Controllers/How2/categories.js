/**
 * IMPORTS
 */
const database = require('../../Config/database');
const fs = require('fs'); // Permet de supprimer les images à la suppression d'un objet

/**
 * Création d'une catégorie
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createCategorie = (req, res, next) => {
    
    values = [[req.body.name, req.body.description, `${req.protocol}://${req.get('host')}/images/${req.file.filename}`]];
    database.query("INSERT INTO how2_categories (name, description, logo) VALUES ?",[values], function (err, result) {
        if (err) throw err;
        console.log("Catégorie ajoutée !")
    })
    res.status(201).json({ message: 'Catégorie créée avec succès !'})
 };

 /**
  * Récupération de l'ensemble des catégories
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
 exports.getAllCategories = (req, res, next) => {       
    database.query("SELECT * FROM how2_categories", function (err, result) {
        if (err) throw err;
        res.status(200).json(result)
    });
 };

/**
 * Mise à jour de la catégorie par ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateCategorie = (req, res, next) => {  
    if (req.file) {
        values = [req.body.name, req.body.description, `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, req.body.id];
    } else {
        values = [req.body.name, req.body.description, req.body.image, req.body.id];
    }     
    database.query("UPDATE how2_categories SET name =?, description=?, logo=? WHERE id=?",values, function (err, result) {
        if (err) throw err;
        console.log("Catégorie modifiée !");
    })
    res.status(201).json({ message: 'Catégorie modifiée avec succès !'})
 };


 /**
  * Récupération d'une catégorie via ID
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
 exports.getCategorieById = (req, res, next) => {     
    database.query("SELECT * FROM how2_categories WHERE id=?", [req.params.id], function (err, result) {
        if (err) throw err;
        res.status(200).json(result)
    });
 };

 /**
  * Suppression d'une catégorie via son id
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
 exports.deleteCategorieById = (req, res, next) => {  
    database.query("SELECT * FROM how2_categories WHERE id=?", [req.params.id], function (err, result) {
        if (err) throw err;

        Object.keys(result).forEach(function(key) { // Récupère le résultat pour le stocker dans la variable row            
            var row = result[key];

            const filename = row.logo.split('/images')[1];
            fs.unlink(`images/${filename}`, () => { // suppression du fichier grace au nom
                database.query("DELETE FROM how2_categories WHERE id=?", [req.params.id], function (err, result) {
                    if (err) throw err;
                    console.log("Catégorie supprimée !");
                });
            })            
        });       
    });   
    res.status(201).json({ message: 'Catégorie supprimée avec succès !'})
 };


