var async = require('async');

var unpack = require('./lib/unpack');
var parse = require('./lib/parse');
var validate = require('./lib/validate');
var analyze = require('./lib/analyze');

/**
 * Unpacks, parses, validates, and analyzes Scratch projects. If successful,
 * will return a valid Scratch project object with appended metadata.
 *
 * @param {Buffer | string} Input buffer or string representing scratch project
 *
 * @return {Object}
 */
module.exports = function (input, callback) {
    unpack(input, function(err, unpackedProject) {
        if (err) {
            return callback(err);
        }
        async.waterfall([
            function (cb) {
                parse(unpackedProject[0], cb);
            },
            validate,
            analyze
        ], function(err2, validatedInput) {
            if (err2) {
                return callback(err2);
            }
            callback(null, [validatedInput, unpackedProject[1]]);
        });
    });
};
