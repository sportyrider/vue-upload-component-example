// ---------------------------------------------------------------- 
// Installation:
//  npm init -y
//  mkdir uploads
//  npm install express --save
//  npm install --save multer
//
// Start server:
//  node server.js
//
// Clients:
//  HTML submit served by Node:  localhost:3000  
//  Vue + vue-upload-component:   open client_vue.html file in the browser
// ----------------------------------------------------------------

const express = require('express');
const multer = require('multer');
const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log("GET: respond with index.html");
});


// CORS
app.use(function(req, res, next) {
    console.log("CORS set on response header");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// It's crucial that the file name matches the name attribute from vue-upload-component 
// or HTML file input tag 
app.post('/upload', upload.single('file-to-upload'), (req, res) => {
  console.log("POST: file uploaded");  
  res.send("All good. Files posted.");  // send response and/or redirect (ignored by Vue)
  //res.redirect('/');

});

// start server and listent on port 3000
var server = app.listen(3000, function() {
    console.log("Server Listening on port %s...", server.address().port);
});

