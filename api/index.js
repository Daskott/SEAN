var express = require('express');
var bodyParser = require('body-parser');
var staticRouter = require(__dirname+'/static');

var router = express.Router();

router.use(bodyParser.json());
router.use(staticRouter); //set static calls

module.exports = router;