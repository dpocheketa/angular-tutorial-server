'use strict';

let mongoose = require('mongoose');
let db = mongoose.connection;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_q70p91jf:mtop63r8ggvrmu6eqeipfb4di@ds029635.mlab.com:29635/heroku_q70p91jf');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});

export default mongoose;
