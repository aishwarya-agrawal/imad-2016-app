var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool=require('pg').Pool;
var crypto =require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');
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
app.get('/ui/registration.html',function(req,res)
{
    res.sendFile(path.join(__dirname,'ui','registration.html'));
});
function hash(input,salt)
{
	var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
	return['pbkdf2S','10000',salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
	var hashedString=hash(req.params.input,'this is a normal string');
	res.send(hashedString);
});
app.post('create-user',function(req,res){
	var name=req.body.username;
	var password=req.body.password;
	var emailid=req.body.emailId;
	var contact=req.body.contactNo;
	var salt=crypto.randomBytes(128).toString('hex');
	var dbString=hash(password,salt);
	pool.query('INSERT INTO "user" (name,password,emailid,contact) values ($1,$2,$3,$4)',[name,password,dbString,emailid,contact],function(err,result){
		if(err)
		{
			res.status(500).send(err.toString());
		}
		else
		{
			res.send('user successfully created'+emailid);		}
	});
});
app.post('/login',function(req,res)
{
	var loginid=req.body.username;
	var password=req.body.password;
	pool.query('SELECT * FROM "user" where emailid=$1',[username],function(err,result)
	{
		if(err)
		{
			res.status(500).send(err.toString());
		}
		else
		{
			if(result.rows.length===0)
			{
				res.send(403).send("username/password incorrect");
			}
			else
			{
				var dbString =result.rows[0].password;
				var salt=dbString.split('$')[2];
				var hashedpassword=hash(password,salt);
				if(hashedpassword===dbString)
				{
					req.session.auth={userid : result.rows[0].id};
					res.send("credentials are correct!");
				}
				else
				{
					res.send(403).send("username/password incorrect");
				}
			}
		}
	});
});
app.get('/check=login',function(req,res)
{
	if(req.session&&req.session.auth&&req.session.auth.userId){
		res.send("you are logged in as "+req.session.auth.userId.toString());
	}
	else
	{
		res.send("you are not logged in ");
	}
});
app.get('/logout',function(req,res)
{
	delete req.session.auth;
	res.send("Logged out");
});

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
var pool = new Pool(config);
app.get('/articles/:articleName',function(req,res)
{
    pool.query("SELECT * FROM article WHERE title=$1"+[req.params.articleName],function(err,result){
        if(err)
        {            res.status(500).send(err.toString());
        }else
        {
            if(result.row.length===0)
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
});

app.get('/ui/write.html',function(req,res)
{
    res.sendFile(path.join(__dirname,'ui','write.html'));
})

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
