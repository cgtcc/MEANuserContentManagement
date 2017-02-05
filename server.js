var express = require('express');
//var helmet = require('helmet'); //ajout à la sécurité des entêtes du serveur
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var User	= require('./app/models/user');
var bodyParser = require('body-parser');
//appel du fichier api.js
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path'); //pour afficher le view index.html
var passport = require('passport');
var social = require('./app/passport/passport')(app, passport);

'use strict';

				//protection variables globales (undefined, NaN, Infinity)
				Object.defineProperty && (function(){
				// take global object
				var global = (function(){return this;})();

				// when "strict mode' is on we can leave - globals are protected by default
				if(!global) return;
 
				// redefine proper values in case they got overridden
				undefined = void 0;
				NaN = 0/0;
				Infinity = 1/0;

				// make globals read only and non-configurable
				["undefined", "NaN", "Infinity"].forEach(function(key){
					Object.defineProperty(global, key, {writable: false, configurable: false});
				});
				})();
/*
//middlewares*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//app.use(helmet()); //ajout à la sécurité des entêtes du serveur

app.use(morgan('dev'));
app.use(express.static(__dirname+'/public')); // middleware necessaire pour afficher views/index.html
app.use('/api',appRoutes);





//connexion a la base de donnees
mongoose.connect('mongodb://127.0.0.1/databaseCMS', function(err){
		if (err) {
			console.log('ERREUR : impossible de connecter a la base de donnees :'+err);
		}
		else
		{
			console.log("Connexion a la base de donnees : success :)");
		}
	});



//charge un template dans les views
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
});




/*
app.get('/home', function (req,res){
		res.send("Hello from home")
	});

app.get('/hello', function (req, res){
	    res.send("Bonjour le monde :)")
    });

*/

app.listen(process.env.PORT || 3000, function () {
	console.log('Le serveur a ete lance avec success...')
		}
	);
