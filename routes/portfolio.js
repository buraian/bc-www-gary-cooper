var express = require('express');
var request = require('request');
var router = express.Router();

// Portfolio Listing Page
router.get('/', function(req, res, next) {
    var allItems = `${req.app.get('remotePortfolio').api}/portfolio/items`;
    request.get({ url: allItems }, function(error, response, body) {
        if ( error || response.statusCode != 200 ) return;

        res.render('portfolio/portfolio-listing', {
            items: JSON.parse(body)
        });
    });
});

// Portfolio Item Page
router.get('/:id', function(req, res, next) {
    var items;

    // Get All Items
    request.get({
        url: `${req.app.get('remotePortfolio').api}/portfolio/items`
    }, function(error, response, body) {
        if ( error || response.statusCode != 200 ) return;

        items = JSON.parse(body);

        // Get Individual Items
        res.render('portfolio/portfolio-item', {
            item: {
                current: items.filter(function(it, i) {
                    return it._id === req.params.id;
                })[0],
                previous: items.map(function(it, i) {
                    if (it._id === req.params.id) return items[i-1];
                }).filter(function(it) {
                    return it !== undefined && typeof(it) !== null;
                })[0],
                next: items.map(function(it, i) {
                    if (it._id === req.params.id) return items[i+1];
                }).filter(function(it) {
                    return it !== undefined && typeof(it) !== null;
                })[0]
            },
            dataSrc: `${req.app.get('remotePortfolio').images}/portfolio`
        });
    });
});

module.exports = router;
