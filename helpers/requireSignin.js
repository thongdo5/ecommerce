const expressJWT = require('express-jwt');

const requireSignin = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'], // added later
  userProperty: 'auth',
});

module.exports = { requireSignin };
