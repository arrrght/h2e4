var sys = require('sys'),
    fs = require('fs'),
    path = require('path'),
    __ = require('./utils').underscore;

// Global Ext4 fake
exports.Ext = {
	// Placeholders
	api: {},
	services: {},
	src: { store: {}, model: {}, controller: {} },
	obj: { store: {}, model: {}, controller: {} },

	// Catch server side code
	endpoint: function(name, fun){
		console.log('* Catch endpoint ' + this.lastClassName);
		var m = fun.toString().match(/\/\/::\ +(.+)\n/);

		if (typeof(this.api[this.lastClassName]) === 'undefined'){
			this.api[this.lastClassName] = [];
			this.services[this.lastClassName] = {};
		}
		this.api[this.lastClassName].push(getDef({ name: name, len: 1}, fun));
		this.services[this.lastClassName][name] = fun;

		function getDef(def, fun){
			// work with //:: { "formHandler": "true" } 
			var m = fun.toString().match(/\/\/::\ +(.+)\n/);
			if(m){
				var a = JSON.parse(m[1]);
				for (var key in a){ def[key] = a[key] }
			}
			return def;
		}
	},

	getModel: function(name){
		return this.obj.model[name];
	},

	// Catch Ext.define('App.controller.MyController ...
	define: function(className, data){
		var that = this,
		    cnArr = className.split('.'),
		    clsApp = cnArr[0], // App name
		    clsType = cnArr[1], // Type of class
		    clsName = cnArr.slice(2).join('.'); // Actually class name

		console.log('* Passing ' + className);
		
		console.log(clsType, clsName);

		this.lastClassName = clsName;
		this.obj[clsType][clsName] = data;
		this.src[clsType][clsName] = 'Ext.define(\'' + className + '\',\n' + this.rec(data, 0) + '\n);';

		if (clsType == 'model'){
			// Model parse
			var modelFields = data.fields,
			    mngFields = {};

			modelFields.forEach(function(field){
				if (field.name != '_id'){
					mngFields[field.name] = cnvType(field.name, field.type);
				}
			});
			that.obj.model[clsName] = mngFields;
		}
	},

	// Inverted parse JS
	rec: function(obj, spc){
		if(obj == null){
			return 'null';
		}else if(typeof(obj) == 'string'){
			if (obj.slice(0,3) == '$$$'){
				return obj.slice(3);
			}else{
				return '"' + obj + '"';
			}
		}else if(__.isDate(obj)){
			return '"' + obj.toString() + '"';
		}else if(typeof(obj) === 'object'){
			var braces = (__.isArray(obj) ? '[]':'{}').split('');
			var ret = braces[0];
			for(var i in obj){
				if (__.isArray(obj)){
					ret += rec(obj[i], spc) + ', ';
				}else{
					ret += i + ': ' + this.rec(obj[i], spc) + ', ';
				}
			}
			ret = ret.slice(0, -2);
			return ret + braces[1];
		}else{
			return obj;
		}
	}
};
