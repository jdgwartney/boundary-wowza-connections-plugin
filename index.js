#!/usr/bin/env node
//load parameters from file
var _param = require('./param.json')


// Requires.
// request, jsdom, optimist, all of which can be install with npm.

// NOTE: -----------------------------------------------------------------------
// Uses jsdom 0.2.13, 0.2.14 has a bug
// https://github.com/tmpvar/jsdom/issues/436
// Install w/ npm via `npm install jsdom@0.2.13`
// -----------------------------------------------------------------------------

// Require modules.
var request = require('request'),
    jsdom = require('jsdom'),
    argv = require('optimist').argv;

// Make sure that at least the --uri argument was passed.
if (_param.uri.length == 0) {
  console.log('URI Required! Script should be called with one argument which is the URI of the connectioncounts HTTP provider to query.');
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
        console.log('Error when contacting ' + _param.uri);
      }

      jsdom.env({
        html: body,
        scripts: [
          'http://code.jquery.com/jquery.min.js'
        ]
      }, function (err, window) {
        // User jQuery to Gather some stats from the connectioncounts HTTP
        // provider.
        var $ = window.jQuery;
        Collector.stats['WOWZA_CONNECTIONS_CURRENT'] = parseInt($('ConnectionsCurrent').html());
        Collector.stats['WOWZA_CONNECTIONS_TOTAL'] = parseInt($('ConnectionsTotal').html());
        Collector.stats['WOWZA_CONNECTIONS_BYTES_IN'] = parseFloat($('MessagesInBytesRate').html());
        Collector.stats['WOWZA_CONNECTIONS_BYTES_OUT'] = parseFloat($('MessagesOutBytesRate').html());
        callback(window);
      });
    });
  },
 }

/**
 * Wrap Collector.get_stats call in a closure it works better with setInterval.
 */
var callDelay = function() {
  Collector.get_stats(argv.uri, function(response) {
    // Print out collected stats.
    //console.log(Collector.stats);
    console.log('WOWZA_CONNECTIONS_CURRENT ' + Collector.stats.WOWZA_CONNECTIONS_CURRENT + ' ' + _param.msource);
    console.log('WOWZA_CONNECTIONS_TOTAL ' + Collector.stats.WOWZA_CONNECTIONS_TOTAL + ' ' + _param.msource)
    console.log('WOWZA_CONNECTIONS_BYTES_IN ' + Collector.stats.WOWZA_CONNECTIONS_BYTES_IN + ' ' + _param.msource)
    console.log('WOWZA_CONNECTIONS_BYTES_OUT ' + Collector.stats.WOWZA_CONNECTIONS_BYTES_OUT + ' ' + _param.msource)
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
