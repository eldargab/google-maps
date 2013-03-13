
# google-maps

Load google maps from JavaScript

## Installation

```
$ component install eldargab/google-maps
```

## API

```javascript
var gmaps = require('google-maps')({
  protocol: 'https',
  v: '3',
  libraries: ['drawing']
  //...
})

gmaps(function (err, api) {
  // use api
})
```

## License

MIT
