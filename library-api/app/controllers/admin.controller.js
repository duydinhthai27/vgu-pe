const db = require("../models");
const User = db.users;

exports.test = async (req, res) => {
  // Test admin
  res.status(200).send({
    message: "Hello admin!"
  });
};