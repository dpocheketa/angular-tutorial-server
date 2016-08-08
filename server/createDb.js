'use strict';

import mongoose from './libs/mongoose';
import userModel from './models/user';

const db = mongoose.connection.db;
const users = [{
  username: 'telndima@gmail.com',
  name: 'telndima@gmail.com',
  email: 'telndima@gmail.com',
  password: '123'
}, {
  username: 'dpocheketa@gmail.com',
  name: 'dpocheketa@gmail.com',
  email: 'dpocheketa@gmail.com',
  password: '123'
},{
  username: 'streetguy911@gmail.com',
  name: 'streetguy911@gmail.com',
  email: 'streetguy911@gmail.com',
  password: '123'
}];

let createUsers = (callback)=> {
  let User = mongoose.model('User');
  let requests = users.map((user) => {
    let instanse = new User(user);

    return instanse.save((err, instanse) => {
      if (err) {
        throw err;
      }
    });
  });

  Promise.all(requests).then(()=>{
    callback();
  }).catch((err)=>{
    console.log(err);
  });

};

mongoose.connection.on('open', function(){
  db.dropDatabase(function(err){
    if (err) {
      throw err;
    }
    console.log('Ok');

    createUsers(function(){
      mongoose.disconnect();
    });
  });

});




