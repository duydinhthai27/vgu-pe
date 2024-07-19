const db = require("../models");
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const {
  sendingMail
} = require("./mailing.controller");

const User = db.users;
const Token = db.tokens;

// user.controller.js

exports.register = (req, res) => {
  // check if email has a valid format
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).send({
      message: "Invalid email format."
    });
  }

  // Validate request
  if (!req.body.username || !req.body.email || !req.body.password || !req.body.fname || !req.body.lname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  // Create a User
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    fname: req.body.fname,
    lname: req.body.lname
  };

  // Save User in the database
  User.create(user)
    .then(created_user => {
      let setToken = Token.create({
        userId: created_user.id,
        token: crypto.randomBytes(16).toString("hex"),
      }).then((created_token) => {
        if (created_token) {
          //send email to the user
          //with the function coming from the mailing.js file
          //message containing the user id and the token to help verify their email
          sendingMail({
            from: "no-reply@example.com",
            to: `${created_user.email}`,
            subject: "Account Verification Link",
            text: `Hello, ${created_user.username} Please verify your email by
                  clicking this link :
                  http://127.0.0.1:6868/api/auth/verify-email/${created_user.id}/${created_token.token} `,
          });

          //if token is not created, send a status of 400
        } else {
          return res.status(400).send("token not created");
        }

        console.log("user", JSON.stringify(user, null, 2));

        //send users details
        return res.status(201).send(created_user);
      });


    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
};

exports.login = async (req, res) => {

  // check if email has a valid format
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).send({
      message: "Invalid email format."
    });
  }

  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (!user) {
    return res.status(400).send({
      message: "User Not found."
    });
  }

  const passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }

  const token = jwt.sign({
    id: user.id,
    role: user.role
  }, process.env.JWT_SECRET, {
    expiresIn: 86400 // 24 hours
  });

  res.status(200).send({
    accessToken: token,
    role: user.role
  });
};

exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    //find user by token using the where clause
    const usertoken = await Token.findOne({
      token,
      where: {
        userId: req.params.id,
      },
    });
    console.log(usertoken);

    //if token doesnt exist, send status of 400
    if (!usertoken) {
      return res.status(400).send({
        msg: "Your verification link may have expired. Please click on resend for verify your Email.",
      });

      //if token exist, find the user with that token
    } else {
      const user = await User.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!user) {
        console.log(user);

        return res.status(401).send({
          msg: "We were unable to find a user for this verification. Please SignUp!",
        });

        //if user is already verified, tell the user to login
      } else if (user.isVerified) {
        return res
          .status(200)
          .send("User has been already verified. Please Login");

        //if user is not verified, change the verified to true by updating the field
      } else {
        const updated = await User.update({
          isVerified: true
        }, {
          where: {
            id: usertoken.userId,
          },
        });
        console.log(updated);

        //if not updated send error message
        if (!updated) {
          return res.status(500).send({
            msg: err.message
          });
          //else send status of 200
        } else {
          return res
            .status(200)
            .send("Your account has been successfully verified");
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};