'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Product Schema
 */

const ProductSchema = new Schema({
  name: { type: String, default: '' },
  protein: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  carb: { type: Number, default: 0 },
  kcal: { type: Number, default: 0 },
  categoryId: { type: Schema.Types.ObjectId }
});

const validatePresenceOf = value => value && value.length;


/**
 * Validations
 */

ProductSchema.path('name').validate(function (name) {
  return name.length;
}, 'Name cannot be blank');


/**
 * Pre-save hook
 */

ProductSchema.pre('save', function (next) {
  if (!this.isNew) {
    return next();
  }

  if (!this.categoryId) {
    next(new Error('Invalid categoryId'));
  } else {
    next();
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
