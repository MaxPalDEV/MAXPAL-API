/**
 * IMPORTS
 */
const express = require('express');
const bodyParser = require('body-parser');
const database = require('./Config/database');
const path = require('path');

/**
 * ROUTES
 */
const contactRoutes = require('./Routes/CV/contact');
const userRoutes = require('./Routes/PMPanel/user');
const categoriesRoutes = require('./Routes/How2/categories');
const sousCategoriesRoutes = require('./Routes/How2/sousCategories');
const itemsRoutes = require('./Routes/How2/items');
const portfolioRoutes = require('./Routes/CV/portfolio');

const app = express();

/**
 * HEADER
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Autorise toutes les origines
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

/* TESTs */
app.use('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });

app.use(bodyParser.json());

/**
 * Initialisation des routes
 */
app.use('/images', express.static(path.join(__dirname,'images'))); // Permet de récupérer les images
app.use('/cv/form', contactRoutes);
app.use('/auth', userRoutes);
app.use('/how2/categories', categoriesRoutes);
app.use('/how2/subcategories', sousCategoriesRoutes);
app.use('/how2/items', itemsRoutes);
app.use('/webcv', portfolioRoutes);

module.exports = app;