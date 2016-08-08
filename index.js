require('babel-core/register')({
  ignore: false,
  plugins: ["transform-object-assign"]
});
require('./server/index.js');
