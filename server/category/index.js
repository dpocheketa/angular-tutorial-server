'use strict';

import categories from '../db/categories.json';
import _ from 'lodash';
import shortId from 'shortid';
import fs from 'fs';

let writeToFile = function(data, file = __dirname + '/../db/categories.json'){
  fs.readFile(file, function(err, data){
    console.log('data2: ', data.toString(), err);
  });
    fs.writeFile(file, JSON.stringify(data), function(err){
      console.log('file: ', file);
      console.log(err);
    });
};

class Category {
  constructor(){
    this.categories = _.clone(categories);
  }

  getAll() {
    return this.categories;
  }

  getById(id){
    return _.find(this.categories, {id});
  }

  create(category){
    category.id = shortId.generate();
    this.categories.push(category);
    writeToFile(this.categories);
console.log(this.categories);
    return category;
  }
}

let category = new Category();

export default category;
