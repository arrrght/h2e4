// Some code stealed from 'express-on-railway' project. https://github.com/1602/express-on-railway

var utils = require('./utils'),
    __ = utils.underscore,
    sys = require('sys'),
    fs = require('fs'),
    path = require('path'),
		vm = require('vm'),
		express = require('express'),
    mongoStore = require('connect-mongodb');

exports.init = function(app){
	if (arguments.length == 2) {
		app = arguments[1];
	}

	// globalize app object
	global.app = app;
	app.root = process.cwd();

	// get config
	var env = { Env: {
		cfg: {},
		create: function(name, code){
			this.cfg[name] = __.extend(this.cfg[code.extend] || {}, code.config);
		}
	}};

	vm.runInNewContext(fs.readFileSync(app.root + '/config/env.js'), env);
	app.env = env.Env.cfg[env.Env.current];

	// console.log(app.env);

	// configure
	app.configure(function(){
		app.use(express.logger({ format: __.green(':method ') + __.yellow(':url ') + ':response-time ms ' + __.red(':status') }))
		app.set('views', app.root + app.env.appDir);

		app.set('view engine', 'ejs');
		app.set('view engine', 'jade');

		app.register('.js', require('ejs'));
		app.register('.html', require('ejs'));

		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser());
		app.use(express.session({ secret: app.env.sessionSecret, store: mongoStore({ dbname: app.env.db }) }));
		app.use(app.router);
		app.use(express.static(app.root + '/public'));
		app.use(express.compiler({ src: app.root + '/public', enable: [ 'less' ] }));

		app.set('view options', { layout: false });
		app.use(express.errorHandler({ dumpExceptions: app.env.dumpException, showStack: app.env.showStack })); 
	});
	
	// now routes TODO
	/*
	app.get('/direct/api', this.showApi);
	app.get('/app/controller/*', this.showController);
	app.get('/app/store/*', this.showStore);
	app.get('/app/model/*', this.showModel);
	app.get('/app/*', function(req, res){
		res.header('Content-type', 'text/javascript');
		res.partial(__dirname + '/../' + req.url);
	});
	*/

	app.get('/', function(req, res){
		res.render('Application.html');
	});

	/*
	app.get('/cp', function(req, res){
		res.render('cp.jade');
	});
	*/
	global.Ext = require('./ext-fake').Ext;
};

exports.createServer = function(){
	var app,
	    key = process.cwd() + '/config/tsl.key',
	    cert = process.cwd() + '/config/tsl.cert';

	if (path.existsSync(key) && path.existsSync(cert)) {
		app = require('express').createServer({
			key: fs.readFileSync(key).toString('utf8'),
			cert: fs.readFileSync(cert).toString('utf8')
		});
	}else{
		app = require('express').createServer();
	}

	exports.init(app);

	return app;
}
