'use strict';

var db = require('./db.json');
var fs = require('fs');
var result = '';
var _ = require('lodash');
var shortId = require('shortid');

var data = _.clone(db);

fs.writeFile('test.json', result, function(err){
  if (err) {
    console.log('Error: ', err);
  }
});

function generateId(){
  _.each(data, function(category){
    var categoryId = shortId.generate();

    category.id = categoryId;

    _.each(category.products, function(product){
      product.id = shortId.generate();
      product.categoryId = categoryId;
    });

  });
}

function initCategories(){
  var categories = [];

  _.each(data, function(ctg){
    var category = _.pick(ctg, 'name', 'id');

    categories.push(category);
  });

  var str = JSON.stringify(categories);

  fs.writeFile('categories.json', str);

}

function initProducts(){
  var products = [];

  _.each(data, function(category){
    products = _.concat(products, category.products);
  });

  var str = JSON.stringify(products);

  fs.writeFile('products.json', str);

}

generateId();
initCategories();
initProducts();

