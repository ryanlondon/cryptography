require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const cookieController = {};

cookieController.checkForCookie = (req, res, next) => {
  if (req.cookies.token) {
    console.log('COOKIE FOUND')
    const decoded = jwt.verify(req.cookies.token, JWT_SECRET);
    res.locals.sessionUser = decoded.username;
  }
  next();
};

cookieController.addCookie = (req, res, next) => {
  console.log('ADD COOKIE');
  const token = jwt.sign({ username: res.locals.result.username }, JWT_SECRET, { algorithm: 'HS256'});
  res.cookie('token', token);
  next();
};

module.exports = cookieController;