#!/usr/bin/env node
//load parameters from file
var _param = require('./param.json')

var parseString = require('xml2js').parseString;


// Requires.
// request, xml2js, optimist, all of which can be install with npm.

// NOTE: -----------------------------------------------------------------------
// Uses jsdom 0.2.13, 0.2.14 has a bug
// https://github.com/tmpvar/jsdom/issues/436
// Install w/ npm via `npm install jsdom@0.2.13`
// -----------------------------------------------------------------------------

// Require modules.
var request = require('request'),
    argv = require('optimist').argv;

// Make sure that at least the --uri argument was passed.
if (_param.uri.length == 0) {
  console.error('URI Required! Script should be called with one argument which is the URI of the connectioncounts HTTP provider to query.');
  return;
}

/**
 *
 */
var Collector = {
  stats: {},
  get_stats: function(uri, callback) {
    request({ uri: _param.uri }, function (error, response, body) {
      if (error && response.statusCode !== 200) {
        console.error('Error when contacting ' + _param.uri);
      } else {

        // Our body is XML document so handle as follows:
        // 1) Parse the XML
        // 2) Check for a parse error
        // 3) If no errors, populate stats object
        // 4) Invoke the callback passing the stats object
        parseString(body, function (err, result) {

	   if (err) {
              console.error(err)
           } else {
             var stats = {}
             stats.WOWZA_CONNECTIONS_CURRENT = parseInt(result.WowzaStreamingEngine.ConnectionsCurrent);
             stats.WOWZA_CONNECTIONS_TOTAL = parseInt(result.WowzaStreamingEngine.ConnectionsTotal);
             stats.WOWZA_CONNECTIONS_BYTES_IN = parseFloat(result.WowzaStreamingEngine.MessagesInBytesRate);
             stats.WOWZA_CONNECTIONS_BYTES_OUT = parseFloat(result.WowzaStreamingEngine.MessagesOutBytesRate);
             callback(stats);
           }
       });
      }
    });
  },
 }

/**
 * Wrap Collector.get_stats call in a closure it works better with setInterval.
 */
var callDelay = function() {
  Collector.get_stats(argv.uri, function(stats) {
    console.log('WOWZA_CONNECTIONS_CURRENT ' + stats.WOWZA_CONNECTIONS_CURRENT + ' ' + _param.msource);
    console.log('WOWZA_CONNECTIONS_TOTAL ' + stats.WOWZA_CONNECTIONS_TOTAL + ' ' + _param.msource)
    console.log('WOWZA_CONNECTIONS_BYTES_IN ' + stats.WOWZA_CONNECTIONS_BYTES_IN + ' ' + _param.msource)
    console.log('WOWZA_CONNECTIONS_BYTES_OUT ' + stats.WOWZA_CONNECTIONS_BYTES_OUT + ' ' + _param.msource)
  });
}

// Get stats once right away.
callDelay();

// Allo repeating at specified interval if --repeat is set.
if (_param.repeat != undefined) {
  // Default to every 30 seconds if no delay is specified.
  if (_param.delay == undefined) {
    _param.delay = 30000;
  }
  setInterval(callDelay, _param.delay);
}
