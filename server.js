var express = require('express');
var morgan = require('morgan');
var path = require('path');
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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var article={
'article-one':{
    title: 'Article one | Aishwarya Agrawal',
    heading : 'Article-one',
    date : 'November 5,2016',
    content:`
    <p> This is my first Article.This is my first Article.This is my first Article.This is my first Article.This is my first            Article.This is my first Article.This is my first Article.This is my first Article.This is my first Article.This is my first        Article.This is my first Article.<p>`
    
},
'article-two':{title: 'Article two | Aishwarya Agrawal',
    heading : 'Article-two',
    date : 'November 5,2016',
    content:`
    <p> This is my second Article.This is my first Article.<p>`
    },
'article-three':{title: 'Article three | Aishwarya Agrawal',
    heading : 'Article-three',
    date : 'November 5,2016',
    content:`
    <p> This is my third Article.This is my first Article.<p>`
    }
};
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
app.get('/:articleName',function(req,res)
{
    var articleName=req.params.articleName;
   res.send(createTemplate(article[articleName])); 
});
var pool = new Pool(config);
app.get('/article-db',function(req,res){
  pool.query('SELECT * FROM article',function(err,result){
      if(err)
      {
          res.status(550).send(err.toString());
      }
      else
      {
          res.send(JSON.stringify(result));
      }
  }) 
})

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});https://cloud.imad.hasura.io/code/files/ui%2Fmain.js
