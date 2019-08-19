const consoleplus = require('../logging/console-plus.js');
const consoleio = require('../logging/consoleio.js');
const expect = require('expect.js');
var sinon = require('sinon');
const assert = require('assert');
const logger = require('../logging/sexylog.js');



var logStub;
var logType;

process.env['LOG_LEVEL'] = 'trace';
console.log('logging-test.js process.env["LOG_LEVEL"]=' + process.env['LOG_LEVEL']);

describe('test sexylog', function() {

    var expectation = function() {

    }

    before(function(){
        logStub = sinon.stub(consoleio, "log").callsFake( function(string, object) {
            //console.log('sinon stub consoleio.log() called=true ');
            process.stdout.write(string + "\n");

            if (logType != 'rainbow') {
                var expectedString = '[' + logType + '] in logging-test.js';
                //console.log('expectedString=' + expectedString);
                var wasExpectedOutput = string.indexOf(expectedString) > -1;
                assert(wasExpectedOutput,  `expected logger output to contain '${expectedString}' but was \n ${string}`);
            } else {
                // Doesn't work with rainbow logging due to changing colours              
            }
            
            
        });
    })

    afterEach(function(){
        if (logStub) logStub.reset();
    })

    after(function(){
        if (logStub) logStub.restore();
    })


    it('console plus prints using default path filter', function(done) {
        doLogging();
        expect(logStub.called).to.be(true);
        done();
    });


    it('console plus prints using override path filter', function(done) {
        process.env['LOG_PATH'] = '/test';
        doLogging();
        expect(logStub.called).to.be(true);
        done();
    });

    it('console plus does not print using override path filter', function(done) {
        process.env['LOG_PATH'] = '/nopath';
        doLogging();
        expect(logStub.called).to.be(false);
        done();
    });

    it('legacy log level as args method works too', function(done) {
        process.env['LOG_PATH'] = '/test';
        doLogging();
        expect(logStub.called).to.be(true);
        done();
    });

    it('prints string arumgents correctly', function(done) {
        process.env['LOG_PATH'] = '/test';
        if (logStub) logStub.restore();
        logStub = sinon.stub(consoleio, "log").callsFake( function(string) {
            //console.log('sinon stub consoleio.log() called=true ');
            process.stdout.write(string + "\n");
            var expectedString = 'goodbye, cruel world!';
            //console.log('expectedString=' + expectedString);
            var expectedOutput = string.indexOf(expectedString) > -1;
            assert(expectedOutput, 'expected logger output to contain "' + expectedString + '"');
        });

        logger.warn('info level string argument: ', "goodbye, cruel world!");
        expect(logStub.called).to.be(true);
        done();
    });

    it('prints number arumgents correctly', function(done) {
        if (logStub) logStub.restore();
        logStub = sinon.stub(consoleio, "log").callsFake( function(string, object) {
            process.stdout.write(string + "\n");
            var expectedString = '999';
            var expectedOutput = string.indexOf(expectedString) > -1;
            assert(expectedOutput, 'expected logger output to contain "' + expectedString + '"');
        });
        logger.warn('info level number argument: ', 999);
        expect(logStub.called).to.be(true);
        done();
    });

    it('console plus increase stack depth logs correctly', function(done) {
        process.env['LOG_PATH'] = '';
        consoleplus.incrementStackDepth(1);
        if (logStub) logStub.restore();
        logStub = sinon.stub(consoleio, "log").callsFake( function(string) {
            process.stdout.write(string + "\n");
            var expectedString = 'stack trace +depth logging';
            //console.log('expectedString=' + expectedString);
            var expectedOutput = string.indexOf(expectedString) > -1;
            assert(expectedOutput, 'expected logger output to contain "' + expectedString + '"');
            // check when we increment stack depth logged file is further up the stack...
            var expectedStackLocation = string.indexOf('runnable.js:') > -1;
            assert(expectedOutput, 'expected logger output to contain "' + expectedStackLocation + '"');
        });
        logger.warn('stack trace +depth logging');
        expect(logStub.called).to.be(true);
        done();
    });


    // it('console plus prints silly', function(done) {
    //     doLogging();
    //     expect(logStub.called).to.be(true);
    //     done();
    // });
});

function doLogging() {

    //set this var right to pass test and check log level:
    logType = 'rainbow';
    logger.rainbow('rainbow level text object: ', {id: 1, message: "hello, world"});

    logType = 'error';
    logger.error('error level text object:', {id: 2, message: "hello, world"});

    logType = 'warn';
    logger.warn('warn level text object: ', {id: 3, message: "hello, world"});

    logType = 'info';
    logger.info('info level text object: ', {id: 4, message: "hello, world"});

    logType = 'debug';
    logger.debug('debug level text object: ', {id: 5, message: "hello, world"});

    logType = 'trace';
    logger.trace('trace level text object: ', {id: 6, message: "hello, world"});

}
