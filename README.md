# sexylog
  node js colourful logging framework

## tests

```
mocha test/logging-test.js
```

## getting started

require sexylog in your nodejs app entry file (usually app.js) like so:

```
require('sexylog');
```

This makes the `logger` object available (yes, globally) anywhere in your code, like so:

```
logger.warn("running logging test");
logger.info("running logging test");
logger.debug("running logging test");
logger.trace("running logging test");
logger.error("running logging test");
```

## Setting log level

currently sexylog is set via an environment variable named `LEVEL` at the command line.

NOTE: Logging levels are show in order of priority. If you set the variable to TRACE all log levels above will print out.
If you set the log level to WARN, only warn and nothign below will print out.

Exmaple:


```
export LEVEL=info
```

or

```
LEVEL=trace node app.js
```