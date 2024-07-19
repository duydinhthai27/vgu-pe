module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
    const authorize = require("../middlewares/authorize.js");
  
    var router = require("express").Router();
  
    /**
     * @swagger
     * /api/admin/test:
     *   get:
     *     summary: Test admin only
     *     tags: 
     *       - Admin
     *     description: This route is only accessible for users with the 'admin' role.
     *     security:
     *       - xAccessToken: []
     *     responses:
     *       200:
     *         description: Test successful.
     *       401:
     *         description: Unauthorized. The user is not an admin.
     */
    router.get("/test", authorize(["admin"]), admin.test);
    
    app.use('/api/admin', router);
  };
  