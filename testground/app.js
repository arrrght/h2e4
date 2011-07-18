#!/usr/bin/env node
var h2e4 = require('h2e4');
var app = module.exports = require('h2e4').createServer();

if (!module.parent) {
    app.listen(process.env.PORT || 3000);
		// TODO some with app.setting.env
    console.log("Server listening on port %d within %s environment", app.address().port, app.settings.env);
}
