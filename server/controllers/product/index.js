'use strict';
import mongoose from 'mongoose';

const MongoProduct = mongoose.model('Product');
class Product {
	constructor(){

	}

	list(req, res, next){
		return MongoProduct.find({}, (err, data) => {
			if (err) {
				next(err);
			}
			res.status(200).json(data);
		});
	}

	create(req, res){
		let product = req.body;
		let instanse = new MongoProduct(product);

		instanse.save((err, data)=>{
			if(err) {
				return res.status(400).json(err);
			}
			res.status(201).json(data);
		});
	}

	find(req, res){
		return MongoProduct.findById(req.params.id, function(err, data){
			if (err) {
				return res.status(404).json({message: 'Product not found'});
			}

			if (data){
				res.status(200).json(data);
			} else {
				res.status(404).json({message: 'Product not found'});
			}
		});
	}

	update(req, res){
		let newProduct = req.body;

		return MongoProduct.findByIdAndUpdate(req.params.id, newProduct, function(err, data){
				if (err) {
						return res.status(400).json(err);
				}

				if (data) {
						res.status(204).json(data);
				} else {
						res.status(404).json({message: 'Product not found'});
				}
		});
	}

  remove(req, res){
    let productId = req.params.id;

    return MongoProduct.findByIdAndRemove(productId, function(err, data){
      if (err) {
        console.log(err);
        return res.status(404).json(err);
      }

      if (data) {
        res.status(202).send();
      } else {
        res.status(404).json({message: 'Product not found'});
      }
    });
  }

}

export default new Product();

