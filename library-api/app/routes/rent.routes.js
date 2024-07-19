const authorize = require("../middlewares/authorize")

module.exports = app => {
  const rent = require("../controllers/rent.controller");
  const router = require("express").Router()

  router.get("/borrows", authorize(["admin", "user"]), rent.getDataBorrow);
  router.get("/borrows/:ID_Book", authorize(["user"]), rent.getBorrowbyId);
  router.post("/borrows", authorize(["user"]), rent.insertBorrow);
  router.patch("/return", authorize(["user"]), rent.returnBook);
  router.delete("/borrows", authorize(["admin"]), rent.deleteRental); // New route for admin to delete rental info

  // Register the router with the app
  app.use('/api', router);
};
