var vows = require('vows'),
		assert = require('assert');

var fs = require('fs'),
    path = require('path'),
		child = require('child_process');


vows.describe('Init things').addBatch({

	'commands': {
		'help': function(){
			//process.chdir('testground');
			/*
			var h2e4 = child.exec('../bin/h2e4');
			assert.isNotNull(h2e4);
			*/
			//process.chdir('..');
		}
	},

	'init': {
		topic: function(){
			child.exec('rm -R ./testground && mkdir testground', this.callback);
		},
		'After recreate testground': {
			topic: function(){
				process.chdir('testground');
				child.exec('h2e4 i', this.callback);
			},
			'is some dir created': function(err, stdout, stderr){
				assert.isNull(err);
			}
		},
		/*
		'init': function(){
			child.exec('rm -R ./testground');
			assert.isFalse(path.existsSync('testground'));
			child.exec('mkdir testground');
			assert.isTrue(path.existsSync('testground'));
			process.chdir('testground');
			//console.log(process.cwd());
			//process.chdir('testground');
			//child.exec('../bin/h2e4 init');
			//console.log(h2e4);
			child.exec('../bin/h2e4zzz init', function(err, stdout, stderr){
				console.log('aASDASDASd');
			});
			assert.isTrue(path.existsSync('app'));
			process.chdir('..');
			child.exec('rm -R ./testground && mkdir testground');
			assert.isTrue(path.existsSync('testground'));
			//assert.isFalse(path.existsSync('testground/app'));
			//console.log(path.existsSync('testground'));
			//path.existsSync('testground/app').should.not.be.true;
		}
		*/
	}

}).export(module);

