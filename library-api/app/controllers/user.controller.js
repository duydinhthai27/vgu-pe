const db = require("../models");
const { sendingMail } = require("../controllers/mailing.controller");
const User = db.users;

exports.info = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  // Return user info
  res.status(200).send({
    //send all user info, except password
    id: user.id,
    username: user.username,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    balance: user.balance,
    club_id: user.club_id,
    address: user.address,
    recent_search: user.recent_search
  });
};

// Return list of users who in system
exports.list = async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
};

// return number of users in system
exports.count = async (req, res) => {
  const count = await User.count();
  res.status(200).send({ count: count });
};

// delete user by id
exports.delete = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  await user.destroy();
  res.status(200).send({ message: "User deleted successfully!" });
};

// delete all users
exports.deleteAll = async (req, res) => {
  await User.destroy({ where: {}, truncate: false });
  res.status(200).send({ message: "All users deleted successfully!" });
};

// delete users by username
exports.deleteByUsername = async (req, res) => {
  const username = req.params.username;
  await User.destroy({ where: { username: username } });
  res.status(200).send({ message: "User deleted successfully!" });
};

// delete users by email
exports.deleteByEmail = async (req, res) => {
  const email = req.params.email;
  await User.destroy({ where: { email: email } });
  res.status(200).send({ message: "User deleted successfully!" });
};
// find by club_id
exports.findByClubId = async (req, res) => {
  const club_id = req.body.club_id;
  const users = await User.findAll({ where: { club_id: club_id } });
  res.status(200).send(users);
};

// send mail to all users
exports.sendMail = async (req, res) => {
  const users = await User.findAll();
  //subject and text get from post
  const subject = req.body.subject;
  const text = req.body.text;
  users.forEach(user => {
    sendingMail({
      from: "no-reply@example.com",
      to: `${user.email}`,
      subject: `${subject}`,
      text: `Hello, ${user.username}, ${text} `,
    });
  });
  res.status(200).send({ message: "Mail sent to all users!" });
};

// send mail to one users on id
exports.sendMailToOne = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }
  //subject and text get from post
  const subject = req.body.subject;
  const text = req.body.text;
  sendingMail({
    from: "no-reply@example.com",
    to: `${user.email}`,
    subject: `${subject}`,
    text: `Hello, ${user.username}, ${text} `,
  });
  res.status(200).send({ message: "Mail sent to user!" });
}

//update user, only access by admin and that own user
exports.update = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }
  if (req.user.id !== user.id && req.user.role !== "admin") {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  await user.update(req.body);
  res.status(200).send({ message: "User updated successfully!" });
  //mail to user that they are updated
  const subject = "User updated"
  const text = "Your user information has been updated:"
  //detailed update like this
  // lname is updated to ...
  // email is updated to ...
  // phone number is updated to ...
  // address is updated to ...
  // etc.
  const detailed_updated = Object.keys(req.body).map(key => {
    return `${key} is updated to ${req.body[key]}`
  }).join("\n")
  sendingMail({
    from: "no-reply@example.com",
    to: `${user.email}`,
    subject: `${subject}`,
    text: `Hello, ${user.username}, ${text}, ${detailed_updated} `,
  });
};
