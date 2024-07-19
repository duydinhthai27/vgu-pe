module.exports = app => {

  const user = require("../controllers/user.controller.js");
  const authorize = require("../middlewares/authorize.js");

  var router = require("express").Router();

  /**
   * @swagger
   * /api/user/info:
   *   get:
   *     summary: Get current user info
   *     tags: 
   *       - User
   *     description: Retrieve information about the currently authenticated user.
   *     security:
   *       - xAccessToken: []
   *     responses:
   *       200:
   *         description: Information about the current user.
   *       401:
   *         description: Unauthorized. The user is not authenticated.
   */
  
  router.get("/info", authorize(["admin","user"]), user.info);

  //list users
  router.get("/list", authorize(["admin","user"]), user.list);

  //count users
  router.get("/count", authorize(["admin","user"]), user.count);

  //find by club_id
  router.get("/findByClubId/:club_id", authorize(["admin","user"]), user.findByClubId);
  //send mail to all users
  router.post("/sendMailToAll", authorize(["admin"]), user.sendMail);
  //send mail to one user
  router.post("/sendMailToOne/:id", authorize(["admin"]), user.sendMailToOne);
  //delete 1 user
  router.delete("/delete/:id", authorize(["admin"]), user.delete);
  //delete all users  
  router.delete("/deleteAll", authorize(["admin"]), user.deleteAll);
  //delete by username  
  router.delete("/deleteByUsername/:username", authorize(["admin"]), user.deleteByUsername);
  //delete by email
  router.delete("/deleteByEmail/:email", authorize(["admin"]), user.deleteByEmail);
  // put to update user
  router.put("/update/:id", authorize(["admin","user"]), user.update);

  app.use('/api/user', router);
};
