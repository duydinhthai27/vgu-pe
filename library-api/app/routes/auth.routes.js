module.exports = app => {
  const user = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: 
   *       - Authentication
   *     description: Create a new user account.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               fname:
   *                 type: string
   *               lname:
   *                 type: string
   *     responses:
   *       200:
   *         description: User registered successfully.
   *       400:
   *         description: Bad request. User registration failed.
   */
  router.post("/register", user.register);

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Login a user
   *     tags: 
   *       - Authentication
   *     description: Authenticate a user and return a token.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: User logged in successfully.
   *       401:
   *         description: Unauthorized. Login failed.
   */
  router.post("/login", user.login);

  router.get('/verify-email/:id/:token', user.verifyEmail)
  
  app.use('/api/auth', router);
};
