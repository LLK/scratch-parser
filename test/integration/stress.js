var test = require('tap').test;
var JSZip = require('jszip');
var data = require('../fixtures/data');
var parser = require('../../index');

test('sb', function (t) {
    var set = data.sb;
    t.plan(set.length * 2);
    for (var i in data.sb) {
        parser(data.sb[i], function (err, res) {
            t.type(err, 'string');
            t.type(res, 'undefined');
        });
    }
});

test('sb2', function (t) {
    var set = data.sb2;
    t.plan(set.length * 6);
    for (var i in data.sb2) {
        parser(data.sb2[i], function (err, result) {
            t.equal(err, null);
            t.equal(Array.isArray(result), true);
            var res = result[0];
            var possibleZip = result[1];
            t.type(res, 'object');
            t.type(res._meta, 'object');
            t.type(res.info, 'object');
            t.equal(possibleZip instanceof JSZip, true);
        });
    }
});

test('json', function (t) {
    var set = data.json;
    t.plan(set.length * 6);
    for (var i in data.json) {
        parser(data.json[i], function (err, result) {
            t.equal(err, null);
            t.equal(Array.isArray(result), true);
            var res = result[0];
            var possibleZip = result[1];
            t.type(res, 'object');
            t.type(res._meta, 'object');
            t.type(res.info, 'object');
            t.equal(possibleZip, null);
        });
    }
});

test('json string', function (t) {
    var set = data.json;
    t.plan(set.length * 6);
    for (var i in data.json) {
        parser(data.json[i].toString('utf-8'), function (err, result) {
            t.equal(err, null);
            t.equal(Array.isArray(result), true);
            var res = result[0];
            var possibleZip = result[1];
            t.type(res, 'object');
            t.type(res._meta, 'object');
            t.type(res.info, 'object');
            t.equal(possibleZip, null);
        });
    }
});
