'use strict';

import mongoose from './libs/mongoose';
import userModel from './models/user';
import productModel from './models/product';
import categoryModel from './models/category';
import data from './db/db.json';

const db = mongoose.connection.db;
const users = [{
    username: 'telndima@gmail.com',
    name: 'telndima@gmail.com',
    email: 'telndima@gmail.com',
    password: '123'
}, {
    username: 'dpocheketa@gmail.com',
    name: 'dpocheketa@gmail.com',
    email: 'dpocheketa@gmail.com',
    password: '123'
},{
    username: 'streetguy911@gmail.com',
    name: 'streetguy911@gmail.com',
    email: 'streetguy911@gmail.com',
    password: '123'
}];

let createUsers = ()=> {
    let User = mongoose.model('User');
    let requests = users.map((user) => {
        let instanse = new User(user);

        return instanse.save((err) => {
            if (err) {
                throw err;
            }
        });
    });

    console.log('createUsers');

    return Promise.all(requests);

};

let createProducts = (products, categoryId) => {
    let Product = mongoose.model('Product');
    let requests = products.map((product) => {
        var p = {
            name: product.name,
            protein: product.protein,
            fat: product.fat,
            carb: product.carb,
            kcal: product.kcal,
            categoryId: mongoose.Types.ObjectId(categoryId)
        };

        return new Product(p).save((err, savedProduct) => {
            console.log('product ' + savedProduct._id + ' Saved');
            if (err) {
                console.log(err);
                throw err;
            }
        });
    });

    return Promise.all(requests);
};

let createCategory = (err, savedCategory, products) => {
    let categoryId = savedCategory._id;

    console.log('Category ' + categoryId + ' Saved');
    if (err) {
        console.log(err);
        throw err;
    }

    return createProducts(products, categoryId);
};

let createCategories = () => {
    let Category = mongoose.model('Category');
    let categoryRequests = data.map((category) => {
        let p = new Promise((resolve, reject)=>{
            let ctg = { name: category.name };
            new Category(ctg).save((err, savedCategory)=>{
                createCategory(err, savedCategory, category.products).then(resolve).catch(reject);
            });

        });

        return p;
    });

    return Promise.all(categoryRequests);
};

mongoose.connection.on('open', function(){
    db.dropDatabase(function(err){
        if (err) {
            throw err;
        }
        console.log('Drop database - Ok');


        Promise.all([
            createUsers(),
            createCategories()
        ]).then(()=>{
            mongoose.disconnect();
            console.log('done');
        }).catch(()=>{
            console.log('error');
        });
    });

});




