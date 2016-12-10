'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const MongoCategory = mongoose.model('Category');
/**
 * Product Schema
 */

const ProductSchema = new Schema({
  name: { type: String, default: '' },
  protein: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  carb: { type: Number, default: 0 },
  kcal: { type: Number, default: 0 },
  categoryId: { type: Schema.Types.ObjectId, required: true }
});

const validatePresenceOf = (value) => {
    return value;
};


/**
 * Validations
 */

ProductSchema.path('name').validate(function (name) {
  return name.length;
}, 'Name cannot be blank');

ProductSchema.path('categoryId').validate(function (categoryId) {
  return categoryId && categoryId.length;
}, 'categoryId cannot be blank');


/**
 * Pre-save hook
 */

let categoryExist = (id) =>{
    return MongoCategory.findById(id);
};

ProductSchema.pre('save', function (next) {
  if (!this.isNew) {
    return next();
  }
  if (!validatePresenceOf(this.categoryId)) {
    next(new Error('Invalid categoryId'));
  } else {

    categoryExist(this.categoryId).then(next).catch(function(){
        next(new Error('Category not found!'));
    });
  }
});

/**
 * Methods
 */

ProductSchema.methods = {};

/**
 * Statics
 */

ProductSchema.statics = {};

mongoose.model('Product', ProductSchema);
