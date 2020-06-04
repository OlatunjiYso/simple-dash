import validator from 'validator';

/**
 * @description - checks if email is valid or not.
 */
const validateEmail = (errors, email) => {
  if (!email) {
    errors.push("email is required");
  }
  if (email && !validator.isEmail(email)) {
    errors.push("email is invalid");
  }
};



/**
 * @description - checks if password is valid or not
 */
const validatePassword = (errors, password) => {
  if (!password) {
    errors.push("Password is required");
  }
  if (password && password.length < 6) {
    errors.push("Password must be a minimum of 6 characters");
  }
};


/**
 * 
 * @param {String} string string to be checked
 */
const validString = (string) => {
    let valid = true;
    if (!string || typeof string == null) valid = false;
    if (string && validator.isEmpty(string, { ignore_whitespace: true }))
      valid = false;
    return valid;
  };
  


  /**
 * 
 * @param {Number} id number to be checked
 */
  const validId = (id) => {
    if (!id || !validator.isInt(id)) return false;
    return true;
  };



/**
 * @description - validates driver login.
 */
export const validateLogin = (req, res, next) => {
  let { email, password } = req.body;
  let errors = [];
  validateEmail(errors, email);
  if(!password) errors.push('password is required');
    if(errors.length > 0 ){
      return res.status(400)
      .json({
        success: false,
        errors
      })
    }
    next();
};





/**
 * @description - validates driver signup.
 */
export const validateSignup = (req, res, next) => {
    let { email, password, name, associationId } = req.body;
    let errors = [];
    validateEmail(errors, email);
    validatePassword(errors, password);
    if (!validString(name)) errors.push('Invalid name');
    if(!validId(associationId)) errors.push('Invalid associationId')
      if(errors.length > 0 ){
        return res.status(400)
        .json({
          success: false,
          errors
        })
      }
      next();
  };
  