
import * as stackTrace from 'stack-trace'

require('./date');
var consoleplus = require('./console-plus.js');
var colors = require('colors');
require("callsite");

// enum Level {
//   trace = 0,
//   debug,
//   info,
//   warn,
//   error,
//   silly
// }

let Levels:{ [index:string] : number } = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  silly: 5
};


class Logger {

  maxLogLevel: string

  constructor(maxLogLevel: string) {
    this.maxLogLevel = maxLogLevel
  }

  info(msg: string, anything: any) {
    if (anything instanceof Object) {
      anything = JSON.stringify(anything);
    }
    this.logPlus('info', msg, anything);
  }

  silly(msg: string, anything: any) {
    if (anything instanceof Object) {
      JSON.stringify(anything);
    }
    this.logPlus('rainbow', msg, anything);
  }

  error(msg: string, anything: any) {
    if (anything instanceof Object) {
      JSON.stringify(anything);
    }
    this.logPlus('error', msg, anything);
  }

  warn(msg: string, anything: any) {
    if (anything instanceof Object) {
      anything = JSON.stringify(anything);
    }
    this.logPlus('warn', msg, anything);
  }

  debug(msg: string, anything: any) {
    if (anything instanceof Object) {
      JSON.stringify(anything);
    }
    this.logPlus('debug', msg, anything);
  }

  trace(msg: string, anything: any) {
    if (anything instanceof Object) {
      JSON.stringify(anything);
    }
    this.logPlus('trace', msg, anything);
  }

  logPlus(level: string, msg: string, anything: any) {

    let val: number = <number> Levels[level.toLowerCase()]
    let val2: number = <number> Levels[this.maxLogLevel.toLowerCase()]

    if(val >= val2) {

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
    }
  }
}

let maxLogLevel:any =  process.env['LOG_LEVEL'] ? process.env['LOG_LEVEL'] : 'warn';

global.logger = new Logger(maxLogLevel);
