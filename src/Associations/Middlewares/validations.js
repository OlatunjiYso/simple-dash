import validator from 'validator';

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
 * @description - validates association.
 */
export const validateAssociation = (req, res, next) => {
    let { associationName } = req.body;
    let errors = [];
    if (!validString(associationName)) errors.push('Invalid name');
      if(errors.length > 0 ){
        return res.status(400)
        .json({
          success: false,
          errors
        })
      }
      next();
  };
  