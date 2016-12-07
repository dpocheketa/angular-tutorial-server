'use strict';
import mongoose from 'mongoose';

const MongoCategory = mongoose.model('Category');
class Category {
  constructor(){

  }

  create(req, res){
    let category = req.body;
    console.log('req.body: ', req.body);
    let instanse = new MongoCategory(category);

    instanse.save((err, instanse)=>{
      if(err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(201).json(instanse);
    });
  }

  find(req, res, next){
    return MongoCategory.findById(req.params.id, function(err, data){
      if (err) {
        console.log(err);
        next(err);
      }

      if (data){
        res.status(200).json(data);
      } else {
        res.status(404).json({message: 'Category not found'});
      }
    });
  }

  list(req, res, next){
    return MongoCategory.find({}, (err, data) => {
      if (err) {
        next(err);
      }
      res.status(200).json(data);
    });
  }
}

export default new Category();

