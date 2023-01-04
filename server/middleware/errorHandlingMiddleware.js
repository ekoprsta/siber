function errorHandler(err, req, res, next){
  let code;
  let messages;

  if(err.name === 'Not Found'){
    code = 404
    messages = 'Not Found'
  } else if (err.name === 'MissingAccessToken'){
    code = 401
    messages = 'Missing Access Token'
  } else if (err.name === 'SequelizeValidationError'){
    code = 400
    messages = err.errors.map((element) => {
      return element.message
    })
  } else if (err.name === 'SequelizeUniqueConstraintError'){
    code = 400
    messages = err.errors.map((element) => {
      return element.message
    })
  } else if ('Forbidden'){
    code = 403
    messages = 'Forbidden'
  } else if ('BadRequest'){
    code = 403
    messages = 'Bad Request'
  } else if ('Unauthorized'){
    code = 403
    messages = 'Invalid username/email or password'
  } else {
    code = 500
    messages = 'Internal server error'
  }

  res.status(code).json({ messages })
}

module.exports = errorHandler