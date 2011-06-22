var sys = require('sys'),
    fs = require('fs'),
    path = require('path');

exports.run = function(app, __){
	// Now init some FIXME
	// Runs this on init
	// Parse models (copypaste FIXME )
	fs.readdirSync(app.root + '/app/model').forEach(function(f) {
		if(f.match(/.js$/)){
			var name = f.slice(0, f.lastIndexOf('.'));
			var o = require(app.root + '/app/model/' + f);

			// Register model if not exists
			try{
				console.log('* model reg: ' + Mongoose.model(name));
			}catch(e){
				// How to catch actual err that model is not exists? TODO
				Mongoose.model(name, new Schema(Ext.obj.model[name]));
			}
		}
	});
	// Parse store copypate FIXME
	fs.readdirSync(app.root + '/app/store').forEach(function(f) {
		if(f.match(/.js$/)){
			var name = f.slice(0, f.lastIndexOf('.'));
			require(app.root + '/app/store/' + f);
		}
	});

	// Parse controllers
	fs.readdirSync(app.root + '/app/controller').forEach(function(f) {
		if(f.match(/.js$/)){
			var name = f.slice(0, f.lastIndexOf('.'));
			require(app.root + '/app/controller/' + f);
			
			// Try to load controller from 'srv' tree
			try {
				require(app.root + '/srv/controller/' + f);
			}catch(nothing){
				//console.log(nothing);
			}
		}
	});
}
