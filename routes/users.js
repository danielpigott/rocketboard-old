var express = require('express');
var router = express.Router();
var Rocketboard = new require('../lib/rocketboard');
var board = new Rocketboard('rocketboard');

router.param('username', function(req, res, next, id){
    req.username = id;
    next()
});
/* GET users listing. */
router.get('/', function(req, res) {
    board.list(function(err, list) { 
        res.send(JSON.stringify(list));
    });
});

router.post('/', function(req, res) {
    board.add(req.param('username'), req.param('score'), function(err) {
        res.send('ok');
    });
});

router.post('/:username/updatescore', function(req, res) {
    board.incr(req.param('username'), req.param('score'), function(err) {
        res.send('ok');
    });
});

router.delete('/:username', function(req, res) {
    board.rm(req.param('username'), function(err) {
        res.send('ok');
    });
});


module.exports = router;
