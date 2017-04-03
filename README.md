# nomatic-events

[![Greenkeeper badge](https://badges.greenkeeper.io/bdfoster/nomatic-events.svg)](https://greenkeeper.io/)

[![GitHub release](https://img.shields.io/github/release/bdfoster/nomatic-events.svg)](https://github.com/bdfoster/nomatic-events/releases)
[![npm](https://img.shields.io/npm/v/nomatic-events.svg)](https://www.npmjs.com/package/nomatic-events)
[![Build status](https://img.shields.io/travis/bdfoster/nomatic-events/master.svg)](https://travis-ci.org/bdfoster/nomatic-events)
[![Coverage Status](https://img.shields.io/coveralls/bdfoster/nomatic-events/master.svg)](https://coveralls.io/github/bdfoster/nomatic-events)
[![Code Climate](https://img.shields.io/codeclimate/github/bdfoster/nomatic-events/badges/gpa.svg)](https://codeclimate.com/github/bdfoster/nomatic-events) 
[![David dependencies](https://img.shields.io/david/bdfoster/nomatic-events.svg)](https://david-dm.org/bdfoster/nomatic-events)
[![David devDependencies](https://img.shields.io/david/dev/bdfoster/nomatic-events.svg)](https://david-dm.org/bdfoster/nomatic-events?type=dev)
[![License](https://img.shields.io/github/license/bdfoster/nomatic-events.svg)](https://github.com/bdfoster/nomatic-events/blob/master/LICENSE)

## Installation

You can install from NPM by doing:
```
npm install --save nomatic-events
```

## Usage

### Basic

```javascript
var events = require("nomatic-events");
var EventEmitter = events.EventEmitter;
var emitter = new EventEmitter();

// Supports RegExp for listeners 
var listener = emitter.on(/incoming/i, function(data) {
  console.log("data is now " + data); 
});
// `listener` is an EventListener, but you do not have to capture this.
 
// Executed asynchronously 
emitter.emit("INCOMING", 42);
```

### Advanced
```javascript
class EventedObject extends EventEmitter {
    constructor() {
        // Call EventEmitter, set maxListeners to 20
        super(20);
        
        this.listenerExecuted = true;
    }
    
    handleIncoming(some, option, or, another) {
        // Variadic arguments supported
        this.emit("INCOMING", some, option, or, another);
    }
}

let evented = new EventedObject();
// Don't have to take every argument supplied by `emit`
evented.on(/IN/, function(some, option, or) {
    console.log(this);
    if (this.listeners) {
        console.log(some, option, or);
        this.listenerExecuted = true;
    } else {
        console.log("Bad context");
    }
});

evented.handleIncoming("See no evil", "Hear no evil", "Speak no evil", 42);
// "See no evil"
// "Hear no evil"
// "Speak no evil"
```

## Testing
Pride is taken when developing tests, you can find unit tests for both EventEmitter and EventListener
[here](test/unit).

## TypeScript
This package is written in TypeScript and declaration files are added to the NPM package.
However, you do not even need to know what TypeScript is in order to use this package,
let alone install the compiler. NPM packages include the compiled project.
