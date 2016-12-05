'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Category Schema
 */



const CategorySchema = new Schema({
  name: { type: String }
});

const validatePresenceOf = value => value && value.length;


/**
 * Validations
 */

CategorySchema.path('name').validate(function (name) {
  return name.length;
}, 'Name cannot be blank');


/**
 * Pre-save hook
 */

CategorySchema.pre('save', function (next) {
  if (!this.isNew) {
    return next();
  }

  if (!validatePresenceOf(this.name)) {
    next(new Error('Invalid Name'));
  } else {
    next();
  }
});

/**
 * Methods
 */

CategorySchema.methods = {};

/**
 * Statics
 */

CategorySchema.statics = {};

mongoose.model('Category', CategorySchema);
