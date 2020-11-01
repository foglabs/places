var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());
// app.use(express.static('client/build'));

// include v3 folder
// app.use(express.static('v3/textures'));

// app.use(express.static('vr'));
const path = require('path');


// main site
app.get('/', function(req, res, next){
  res.header('Content-Type', 'text/html')
  res.sendFile(path.join(__dirname, 'index.html'))
})
app.get('/lib/three.module.js', function(req, res){
  res.header('Content-Type', 'text/javascript')
  res.sendFile(path.join(__dirname, 'lib', 'three.module.js'))
})
app.get('/lib/:filename', function(req, res){
  res.header('Content-Type', 'text/javascript')
  console.log("filenammeme", req.params.filename)
  res.sendFile(path.join(__dirname, 'lib', req.params.filename))
})
app.get('/textures/:filename', function(req, res){
  res.header('Content-Type', 'image/jpg')
  console.log("filenammeme", req.params.filename)
  res.sendFile(path.join(__dirname, 'textures', req.params.filename))
})



// main site
app.listen(4000);
