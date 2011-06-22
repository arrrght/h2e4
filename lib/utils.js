var sys = require('sys'),
    fs = require('fs'),
    path = require('path'),
    __ = require('underscore'),
		args = process.argv.slice(2),
    arg = args.shift(),
    fnd = '';

__.mixin(require('underscore.string'));
__.mixin({
	green: function(string){ return '\033[32m' + string + '\033[39m'; },
	yellow: function(string){ return '\033[33m' + string + '\033[39m'; },
	red: function(string){ return '\033[31m' + string + '\033[39m'; },
	msgExists: function(){ return __.yellow(__.lpad('exists  ', 12)) },
  msgCreate: function(){ return __.green(__.lpad('create  ', 12)) }
});

exports.underscore = __;
