const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const decode = jwt.verify(req.body._token, process.env.JWT_SECRET)
    if (decode) {
      next();
    }
  } catch (err) {
    return res.status(400).json({
      message: 'Login to continue',
      success: false,
    })
  }
}
