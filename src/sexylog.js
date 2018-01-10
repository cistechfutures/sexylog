require('./date');
var consoleplus = require('./console-plus.js');
var stackTrace = require('stack-trace');
var colors = require('colors');
require("callsite");




var levels = {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
    silly: 5
};




var Logger = function(maxLevel) {
    const _this = this;

    _this.info = function(msg, anything) {
        if (typeof anything == Object) {
           anything = JSON.stringify(anything);
        }
        _this.logPlus('info', msg, anything);
    }

    _this.warn = function(msg, anything) {
            if (typeof anything == Object) {
            anything = JSON.stringify(anything);
            }
            _this.logPlus('warn', msg, anything);
    }

    _this.debug = function(msg, anything) {
            if (typeof anything == Object) {
                JSON.stringify(anything);
            }
            _this.logPlus('debug', msg, anything);
    }

    _this.trace = function(msg, anything) {
            if (typeof anything == Object) {
                anything = JSON.stringify(anything);
            }
            _this.logPlus('trace', msg, anything);
    }

    _this.error = function(msg, anything) {
            if (typeof anything == Object) {
                anything = JSON.stringify(anything);
            }
            _this.logPlus('error', msg, anything);
    }

    _this.silly = function(msg, anything) {
        if (typeof anything == Object) {
        anything = JSON.stringify(anything);
        }
        _this.logPlus('rainbow', msg, anything);
    }


    _this.logPlus = function(level, msg, anything) {
        //console.log('sexlog.' + level + '() msg="' + msg + '", other="' + anything + '"');
        //console.log('level=' + level + ', maxLevel=' + maxLevel);
        if(levels[level.toLowerCase()] >=  levels[maxLevel.toLowerCase()]) {

            if(anything == undefined || anything == null) {
                if(consoleplus) {
                    consoleplus[level](msg);
                }
            } else {
                if(consoleplus) {
                    consoleplus[level](msg, anything);
                }
            }
        } else {
            // Do nothing, don't log
            //console.log('SKIP LOGGING! sexlog.' + level + '() level=' + levels[level.toLowerCase()] + '  < maxLevel ' + maxLevel + '=' + levels[maxLevel.toLowerCase()] );
        }
    }
    return this;
}


var maxLogLevel = process.env['LOG_LEVEL'] ? process.env['LOG_LEVEL'] : 'warn';
global.logger = Logger(maxLogLevel);

