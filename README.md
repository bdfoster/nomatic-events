# nomatic-events

[![GitHub release](https://img.shields.io/github/release/bdfoster/nomatic-events.svg)](https://github.com/bdfoster/nomatic-events/releases)
[![npm](https://img.shields.io/npm/v/nomatic-events.svg)](https://www.npmjs.com/package/nomatic-events)
[![Build Status](https://img.shields.io/travis/bdfoster/nomatic-events/master.svg)](https://travis-ci.org/bdfoster/nomatic-events)
[![Coverage Status](https://img.shields.io/coveralls/bdfoster/nomatic-events/master.svg)](https://coveralls.io/github/bdfoster/nomatic-events)
[![Code Climate](https://img.shields.io/codeclimate/github/bdfoster/nomatic-events/badges/gpa.svg)](https://codeclimate.com/github/bdfoster/nomatic-events) 
[![David dependencies](https://img.shields.io/david/bdfoster/nomatic-events.svg)](https://david-dm.org/bdfoster/nomatic-events)
[![David devDependencies](https://img.shields.io/david/dev/bdfoster/nomatic-events.svg)](https://david-dm.org/bdfoster/nomatic-events?type=dev)

Fast, asynchronous, and regex-enabled event framework for Node.js

## Installation
You can install from NPM by doing:
```
npm install --save nomatic-events
```

## Usage

### Basic
```
var events = require("nomatic-events");
var EventEmitter = events.EventEmitter;

var emitter = new EventEmitter();

emitter.on("incoming", function(data) {
  console.log("data is now " + data); 
});

emitter.emit(42);
```
