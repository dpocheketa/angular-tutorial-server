'use strict';
import mongoose from 'mongoose';

const MongoUser = mongoose.model('User');

class User {
  constructor(){

  }

  create(req, res){
    let user = req.body;
    console.log('req.body: ', req.body);
    let instanse = new MongoUser(user);

    instanse.save((err, instanse)=>{
      if(err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(201).json(instanse);
    });
  }

  find(req, res, next){
    return MongoUser.findById(req.params.id, function(err, data){
      if (err) {
        console.log(err);
        next(err);
      }

      if (data){
        res.status(200).json(data);
      } else {
        res.status(404).json({message: 'User not found'});
      }
    });
  }

  list(req, res, next){
    return MongoUser.find({}, (err, data) => {
      if (err) {
        next(err);
      }
      res.status(200).json(data);
    });
  }
}

export default new User();
