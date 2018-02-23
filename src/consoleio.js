

/**
 * stdout logging done in this module for testing purposes
 * so it can be stubbed with sinon testing framework
 * 
 * @param {*} string 
 */
module.exports.log = function(string) {
    process.stdout.write(string + "\n");
}