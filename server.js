var express = require('express');
var morgan = require('morgan');
var path = require('path');
var http=require('http');
var pool=require('pg').Pool;
var config={
    user:'aishwarya-agrawal',
    database:'aishwarya-agrawal',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query("SELECT * FROM letter",function(err,result){
        if(err)
        {
            res.status('580').send(err.toString());
        }else
        {
            res.send(JSON.stringify(result,rows));
        }
    })
    
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});https://cloud.imad.hasura.io/code/files/ui%2Fmain.js
