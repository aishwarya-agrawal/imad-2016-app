var express = require('express');
var morgan = require('morgan');
var path=require('path');
var app = express();
app.use(morgan('combined'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/ui/registration.html',function(req,res)
{
    res.sendFile(path.join(__dirname,'ui','registration.html'));
});

app.get('/ui/write.html',function(req,res)
{
    res.sendFile(path.join(__dirname,'ui','write.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/pencil-1486278.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'pencil-1486278.jpg'));
});
app.get('/ui/typewriter-801921.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'typewriter-801921.jpg'));
});
app.get('/ui/clipboard-1772235_960_720.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'clipboard-1772235_960_720.png'));
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
