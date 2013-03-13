var jsonp = require('jsonp')

module.exports = function (opts) {
  var loaded = false
    , loading
    , err
    , api

  return function (cb) {
    if (loaded) return cb(err, api)
    if (loading) return loading.push(cb)
    loading = []
    loading.push(cb)
    load(opts, function (_err, _api) {
      loaded = true
      err = _err
      api = _api
      for (var i = 0; i < loading.length; i++) {
        loading[i](err, api)
      }
      loading = null
    })
  }
}

module.exports.load = load

function load (opts, cb) {
  if (typeof opts == 'function') {
    cb = opts
    opts = {}
  }

  opts.sensor = !!opts.sensor

  var url = protocol(opts) + '//maps.googleapis.com/maps/api/js?' + query(opts)

  jsonp(url, function (err) {
    if (err) return cb(new Error('Failed to load Google maps API'))
    cb(null, google.maps)
  })
}

function protocol (opts) {
  var p = opts.protocol || location.protocol
  if (!~p.indexOf(':')) p += ':'
  if (!~p.indexOf('http')) p = 'http:'
  return p
}

function query (opts) {
  return stringify(opts, function (key, val, push) {
    if (key == 'protocol') return
    if (key == 'libraries') return push(key, val.join(','))
    push(key, val)
  })
}

function stringify (obj, cb) {
  var pairs = []
  for (var key in obj) {
    cb(key, obj[key], function (key, val) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(val))
    })
  }
  return pairs.join('&')
}
