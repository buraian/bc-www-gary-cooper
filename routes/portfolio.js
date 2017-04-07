var express = require('express');
var request = require('request');
var router = express.Router();

// Portfolio Listing Page
router.get('/', function(req, res, next) {
    var requestUrl = req.app.get('remotePortfolio').api + '/portfolio/items';
    request.get({ url: requestUrl }, function(error, response, body) {
        if ( error || response.statusCode != 200 ) return;

        res.render('portfolio/portfolio-listing', {
            items: JSON.parse(body)
        });
    });
});

// Portfolio Item Page
router.get('/:id', function(req, res, next) {
    var requestUrl = req.app.get('remotePortfolio').api + '/portfolio/items/' + req.params.id;
    request.get({ url: requestUrl }, function(error, response, body) {
        if ( error || response.statusCode != 200 ) return;

        res.render('portfolio/portfolio-item', {
            item: JSON.parse(body),
            dataSrc: req.app.get('remotePortfolio').images + '/portfolio'
        });
    });
});

module.exports = router;
