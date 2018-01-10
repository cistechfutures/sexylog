/**
 * Super useful logger
 *
 * Currently no loggers out there that log time, filename and line number
 * 
 *
 * Example output:
 * 2010-01-17 11:43:37.987 [info] Message in models/User.js:120
 */
const fs = require("fs");
const util = require("util");
const stackTrace = require('stack-trace');
const colors = require('colors');
const consoleio = require('./consoleio.js');
require("callsite");

const LOG_PATH_ENV = 'LOG_PATH';

module.exports = {
	info: function() {	
        var trace = getTrace();
        if (! logPath(trace)) return;
		var string = util.format("%s [info] in %s:%d %s", trace.timestamp, file(trace), trace.lineno, util.format.apply(this, arguments));
		consoleio.log(colors.cyan(string));
	},
	
	warn: function() {
         var trace = getTrace();
        if (! logPath(trace)) return;
		var string = util.format("%s [warn] in %s:%d %s", trace.timestamp, file(trace), trace.lineno, util.format.apply(this, arguments));
		consoleio.log(colors.blue(string));
	},
    
    debug: function() {
         var trace = getTrace();
        if (! logPath(trace)) return;
		var string = util.format("%s [debug] in %s:%d %s", trace.timestamp, file(trace), trace.lineno, util.format.apply(this, arguments));
		consoleio.log(colors.yellow(string));
	},
    
    trace: function() {
         var trace = getTrace();
        if (! logPath(trace)) return;
		var string = util.format("%s [trace] in %s:%d %s", trace.timestamp, file(trace), trace.lineno, util.format.apply(this, arguments));
		consoleio.log(colors.grey(string));
	},  
    
    silly: function() {
         var trace = getTrace();
        if (! logPath(trace)) return;
		var string = util.format("%s [silly] in %s:%d %s", trace.timestamp, file(trace), trace.lineno, util.format.apply(this, arguments));
		consoleio.log(colors.rainbow(string));
	}, 
	
	error: function() {
         var trace = getTrace();
        if (! logPath(trace)) return;
		var string = util.format("%s [error] in %s:%d %s", trace.timestamp, file(trace), trace.lineno, util.format.apply(this, arguments));
		consoleio.log(colors.red.bold(string));
	}
}

function getTrace() {

    var err = new Error('something went wrong');
    var trace = stackTrace.parse(err);
    var call = trace[4];  // <-- TODO to get correct file name you may need to tweak the call stack index
    
    // console.log('console-plus call=');
    // console.dir(call);
    
	return {
		file: call.getFileName(),
		lineno: call.getLineNumber(),
		timestamp: new Date().toUTCString()
	}
}

function file(trace) {
    var fileSplit = trace.file.split('/');
    var file = fileSplit[fileSplit.length - 1];
    return file;
}

function logPath(trace) {
    var logpathFilter = process.env[LOG_PATH_ENV] || '/';
    var logPath = false;
    var file = trace.file;
    var startsWith = file.indexOf(logpathFilter) > -1;
    if (startsWith) {
        logPath = true;   
    }
    return logPath;
}

function colourise(colourCode, string) {
	return "\033[" + colourCode + "m"  + string + "\033[0m";
}