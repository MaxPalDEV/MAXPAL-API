const multer = require('multer');

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png'
};

const storage = multer.diskStorage({ // Définition de l'enregistrement des fichiers
    destination: (req, file, callback) => {
        callback(null, 'images'); // Déstination de l'enregistreement des images
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // Remplace les espaces du nom du fichier original par des underscores
        const extension = MIME_TYPES[file.mimetype]; // Définition de l'extension du fichier par rapport au dictionnaire MIME_TYPES
        callback(null, name + Date.now() + '.' + extension); // Génération du nom du fichier
    }
});

module.exports = multer({ storage }).single('image');