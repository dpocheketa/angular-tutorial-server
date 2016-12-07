'use strict';
import mongoose from 'mongoose';

const MongoProduct = mongoose.model('Product');
class Product {
  constructor(){

  }

  create(req, res){
    let product = req.body;
    console.log('req.body: ', req.body);
    let instanse = new MongoProduct(product);

    instanse.save((err, instanse)=>{
      if(err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(201).json(instanse);
    });
  }

  find(req, res, next){
    return MongoProduct.findById(req.params.id, function(err, data){
      if (err) {
        console.log(err);
        next(err);
      }

      if (data){
        res.status(200).json(data);
      } else {
        res.status(404).json({message: 'Product not found'});
      }
    });
  }

  list(req, res, next){
    return MongoProduct.find({}, (err, data) => {
      if (err) {
        next(err);
      }
      res.status(200).json(data);
    });
  }
}

export default new Product();

