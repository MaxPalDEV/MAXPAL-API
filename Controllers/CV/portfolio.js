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
exports.createPortfolio = (req, res, next) => {
    
    values = [[req.body.name,`https://${req.get('host')}/images/${req.file.filename}`, req.body.technos, req.body.description]];
    database.query("INSERT INTO webcv_portfolio (name, logo, technos, description) VALUES ?",[values], function (err, result) {
        if (err) throw err;
        console.log("Item de portfolio ajouté !")
        res.status(201).json(result);
    })
    
 };

  /**
 * Création d'une catégorie
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.addImageToPortfolio = (req, res, next) => {
    
    values = [[`https://${req.get('host')}/images/${req.file.filename}`, req.body.id]];
    database.query("INSERT INTO webcv_portfolioimage (url, portfolio_id) VALUES ?",[values], function (err, result) {
        if (err) throw err;
        console.log("image de portfolio ajouté !")
        res.status(201).json(result);
    })
    
 };

  /**
  * Récupération de l'ensemble des items du portfolio
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
   exports.getAllPortfolio = (req, res, next) => {       
    database.query("SELECT * FROM webcv_portfolio", function (err, result) {
        if (err) throw err;
        res.status(200).json(result)
    });
 };

  /**
  * Récupération d'un item de portfolio via ID
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
   exports.getPortfolioById = (req, res, next) => {     
    database.query("SELECT * FROM webcv_portfolio WHERE id=?", [req.params.id], function (err, result) {
        if (err) throw err;
        res.status(200).json(result)
    });
 };


 /**
  * Récupération des image de portfolio via ID
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
  exports.getPortfolioImageById = (req, res, next) => {     
    database.query("SELECT * FROM webcv_portfolioimage WHERE portfolio_id=?", [req.params.id], function (err, result) {
        if (err) throw err;
        res.status(200).json(result)
    });
 };

  /**
  * Suppression d'un item via son id
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
   exports.deletePortfolioById = (req, res, next) => {  
    database.query("SELECT * FROM webcv_portfolio WHERE id=?", [req.params.id], function (err, result) {
        if (err) throw err;

        Object.keys(result).forEach(function(key) { // Récupère le résultat pour le stocker dans la variable row            
            var row = result[key];

            const filename = row.logo.split('/images')[1];
            fs.unlink(`images/${filename}`, () => { // suppression du fichier grace au nom
                database.query("DELETE FROM webcv_portfolio WHERE id=?", [req.params.id], function (err, result) {
                    if (err) throw err;
                    console.log("Item supprimé !");
                });
            })            
        });       
    });   
    res.status(201).json({ message: 'Item supprimé avec succès !'})
 };