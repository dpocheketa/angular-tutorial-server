'use strict';
import mongoose from 'mongoose';

const MongoCategory = mongoose.model('Category');
const MongoProduct = mongoose.model('Product');

let findCategoryProducts = (categoryId)=>{
    return MongoProduct.find({categoryId});
};

class Category {

  constructor(){

  }

  create(req, res){
    let category = req.body;
    let instanse = new MongoCategory(category);

    instanse.save((err, instanse)=>{
      if(err) {
        return res.status(400).json(err);
      }
      res.status(201).json(instanse);
    });
  }

  find(req, res){
    return MongoCategory.findById(req.params.id, function(err, data){
      if (err) {
        return res.status(404).json({message: 'Category not found'});
      }

      if (data){
        res.status(200).json(data);
      } else {
        res.status(404).json({message: 'Category not found'});
      }
    });
  }

  update(req, res){
    let newCategory = req.body;

    return MongoCategory.findByIdAndUpdate(req.params.id, newCategory, function(err, data){
        if (err) {
            return res.status(400).json(err);
        }

        if (data) {
            res.status(204).json(data);
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

  remove(req, res){
    let categoryId = req.params.id;

    findCategoryProducts(categoryId).then((data)=>{

        if (data.length) {
            res.status(400).json({message: 'Can`t remove category with products'});
        } else {
            MongoCategory.findByIdAndRemove(categoryId, function(err, data){
              if (err) {
                return res.status(404).json(err);
              }

              if (data) {
                res.status(202).send();
              } else {
                res.status(404).json({message: 'Category not found'});
              }
            });
        }
    }).catch((err) =>{
        res.status(400).json(err);
    });
  }

}

export default new Category();

