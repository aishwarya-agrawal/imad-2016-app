var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app=express();
var pg= require('pg');
var Pool=require('pg').Pool;
var config={
    user:'aishwarya-agrawal',
    database:'aishwarya-agrawal',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var pool=new Pool('config');
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
var pool=new Pool('config');
app.get('/test-db',function(req,res){
  pool.query('SELECT * FROM test',function(err,result){
      if(err)
      {
          res.status(550).send(err.toString());
      }
      else
      {
          res.send(JSON.stringify(result.rows));
      }
  }) ;
var app = express();
app.use(morgan('combined'));



function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
var htmlTemplate=`<html>
<head>
<title>
${title}
</title>
<meta name="viewport" content="width-device-width,initial-scale-1" />
<link rel="stylesheet" type="text/css" href="ui/style.css">
</head>
<body>
   <div class="container">
      <div>
      <a href="/">Home</a>
      </div>
      <hr/>
      <h3>
      ${heading}
      </h3>
      <div>
      ${date}
      </div>
      <div>
      ${content}
      </div>
      </div>
</body>
</html>
`;
return htmlTemplate;
}
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/articles/:articleName',function(req,res)
{
    pool.query("SELECT * FROM article WHERE title='"+req.params.articleName+"'",function(err,result){
        if(err)
        {
            res.status(550).send(err.toString());
        }else
        {
            if(result.row.length()===0)
            {
                res.status(404).send('Article not found');
            }
            else
            {
                var articleData= result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
   res.send(createTemplate(article[articleName])); 
});

});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
