var compression = require('compression');
var express = require('express');
var path = require('path');
var app = express();
app.use(compression());
app.use('/', express.static(path.join(__dirname, './dist/')));
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, './dist/', 'index.html'))
});
app.listen(3000);
