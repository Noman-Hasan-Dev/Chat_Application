const createError = require('http-errors');

// 404 Not Found Handler
function notFoundHandler(req, res, next) {
  next(createError(404, 'Not Found'));
}

// Default Error Handler
function errorHandler(err, req, res, next) {
  // res.status(err.status || 500);
  res.render('error', {
    title: "Error Page",
//     message: err.message,
//     error: process.env.NODE_ENV === 'development' ? err : {}
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
