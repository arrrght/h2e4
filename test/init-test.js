var vows = require('vows'),
		assert = require('assert');

var fs = require('fs'),
    path = require('path'),
		child = require('child_process');


vows.describe('Init things').addBatch({

	'init': {
		topic: function(){
			child.exec('rm -R ./testground && mkdir testground', this.callback);
		},
		'After recreate testground': {
			topic: function(){
				process.chdir('testground');
				child.exec('h2e4 i', this.callback);
			},
			'Is some dirs created': function(err, stdout, stderr){
				assert.isNull(err);
				assert.isTrue(path.existsSync('app/controller'));
				assert.isTrue(path.existsSync('app/model'));
				assert.isTrue(path.existsSync('app/store'));
				assert.isTrue(path.existsSync('app/view'));
				assert.isTrue(path.existsSync('app/Application.html'));
				assert.isTrue(path.existsSync('app.js'));
			}
		},
	},
	'some': {
		'asds': function(){
			assert.isTrue(true);
		}
	}

}).export(module);

