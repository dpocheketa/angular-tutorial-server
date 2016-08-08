'use strict';

let mongoose = require('mongoose');
let db = mongoose.connection;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});

export default mongoose;
