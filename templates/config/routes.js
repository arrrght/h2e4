	//TODO
	app.get('/direct/api', this.showApi);
	app.get('/app/controller/*', this.showController);
	app.get('/app/store/*', this.showStore);
	app.get('/app/model/*', this.showModel);
	app.get('/app/*', function(req, res){
		res.header('Content-type', 'text/javascript');
		res.partial(__dirname + '/../' + req.url);
	});
	app.get('/', function(req, res){
		res.render('Application.html');
	});
	app.get('/cp', function(req, res){
		res.render('cp.jade');
	});
