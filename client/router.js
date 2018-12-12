const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Load documentation and provide locals.
const documentation = require('../documentation');
router.use((req, res, next) => {
    res.locals.path = req.path;
    res.locals.availableDocumentation = Object.keys(documentation);
    next();
});

// Serve homepage.
router.get('/', (req, res) => {
    res.render('home');
});

// Serve documentation.
router.get('/documentation', (req, res) => res.redirect('/'));
router.get('/documentation/:document', (req, res, next) => {
    let documentName = req.params.document;
    let document = documentation[documentName];
    if (document) {
        res.locals.document = document;
        console.log(document.tocJson);
        res.render('documentation');
    } else next();
});
router.use('/documentation', express.static(path.join(__dirname, 'documentation')));

// Serve character sheets.
router.get('/character/:id?', (req, res, next) => {
    let characterId = req.params.id || 'demo';
    fs.readFile(path.join(__dirname, '..', 'characters', `${characterId}.json`), 'utf8', (error, contents) => {
        if (error) return next(createError(404));
        res.locals.character = JSON.parse(contents);
        res.render('character-sheet');
    });
});

// Export the router.
module.exports = router;
