var express = require('express');
var bodyParser = require('body-parser');
var staticRouter = require(__dirname+'/static');
var apiRouter = require(__dirname+'/routes');

var router = express.Router();

router.use(bodyParser.json());
router.use(staticRouter); //set static calls
router.use(apiRouter);
router.use(function(request, response){
  response.sendfile('public/index.html');
});



module.exports = router;
