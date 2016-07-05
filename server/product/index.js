'use strict';

import products from '../db/products.json';
import _ from 'lodash';
import shortId from 'shortid';
import fs from 'fs';

let writeToFile = function(data, file = __dirname + '/../db/products.json'){
  fs.writeFile(file, JSON.stringify(data), function(err){
    console.log('Product error', err);
  });
};

class Product {
  constructor(){
    this.products = _.clone(products);
  }

  getAll() {
    return this.products;
  }

  getById(id){
    return _.find(this.products, {id});
  }

  create(category){
    category.id = shortId.generate();
    this.products.push(category);
    writeToFile(this.products);

    return category;
  }
}

let product = new Product();

export default product;
