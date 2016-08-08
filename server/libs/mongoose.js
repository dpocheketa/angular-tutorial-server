'use strict';

let mongoose = require('mongoose');
let db = mongoose.connection;
mongoose.Promise = global.Promise;
let mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/test';
mongoose.connect(mongodbUri);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});

export default mongoose;
