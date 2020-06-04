import validator from "validator";

/**
 *
 * @param {Number} amount number to be checked
 */
const validAmount = (amount) => {
  if (!amount) return false;
  if (amount && !validator.isNumeric(amount)) return false;
  return true;
};

/**
 * @description - validates driver signup.
 */
export const validateContribution = (req, res, next) => {
  let { amount, type } = req.body;
  let errors = [];
  if (!validAmount(amount)) errors.push("Invalid amount");
  if (!type) errors.push("invalid type");
  if (type && !validator.isIn(type, ["daily", "interest"]))
    errors.push("invalid type");
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }
  next();
};
