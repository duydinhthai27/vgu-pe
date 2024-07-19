const jwt = require('jsonwebtoken');

const authorize = (roles = []) => {
  // roles param can be a single role string (e.g., 'User') 
  // or an array of roles (e.g., ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach decoded token to request as req.user
    (req, res, next) => {
      const token = req.headers['x-access-token'];
      if (!token) {
        return res.status(403).send({ message: "No token provided!" });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorized!" });
        }
        req.user = decoded;
        next();
      });
    },

    // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      next();
    }
  ];
};

module.exports = authorize;