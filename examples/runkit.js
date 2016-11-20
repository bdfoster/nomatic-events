var EventEmitter = require('nomatic-events').EventEmitter;
var emitter = new EventEmitter();

var result;

emitter.on('incoming', function(data) {
  result = data[1];
});

emitter.emit('incoming', 20, 42, 31, 35, 2);

(result === 42);
