'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/angular-tutorial');
console.log(mongoose.connection.readyState);

mongoose.connection.on('error', function (err) {
    console.log(err);
});
