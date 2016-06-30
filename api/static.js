var express = require('express');
var staticRouter = express.Router();

staticRouter.use(express.static(__dirname + '/../assets')); //route to assets
staticRouter.use(express.static(__dirname + '/../public/templates')); //route to templates

staticRouter.get('/', function(request, response){
  response.sendfile('public/index.html');
});

// staticRouter.use(function(request, response){
//   response.sendfile('public/index.html');
// });

module.exports = staticRouter;
