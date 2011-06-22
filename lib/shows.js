var sys = require('sys'),
    fs = require('fs'),
    path = require('path'),
    __ = require('underscore'),
		args = process.argv.slice(2),
    arg = args.shift(),
    fnd = '';

exports.Ext = {
	api: 'asdasd'
};

exports.showApi = function(req, res, next){
	var result = { type: 'remoting', url: '/direct/entry', actions: exports.Ext.api };
	res.writeHead(200, { 'Content-type': 'text/javascript' });
	res.write('Ext.app.REMOTING_API=' + JSON.stringify(result));
	res.end(';Ext.Direct.addProvider(Ext.app.REMOTING_API);Ext.app.REMOTING_API.enableBuffer=100;');
}
