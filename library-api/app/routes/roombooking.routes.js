module.exports = app => {
    const roomBookings = require("../controllers/roombooking.controller.js");
    const user = require("../controllers/user.controller.js");
    const authorize = require("../middlewares/authorize.js");
    var router = require("express").Router();


    // Create a new RoomBooking
    router.post("/", authorize(["admin","user"]), roomBookings.create);
    // Update a RoomBooking with id
    router.put("/update/:id", authorize(["admin","user"]), roomBookings.update);
    // Delete a RoomBooking with id
    router.delete("/delete/:id", authorize(["admin","user"]), roomBookings.delete);
    // Delete all RoomBookings
    router.delete("/delete_all/", authorize("admin"), roomBookings.deleteAll);
    // Retrieve all RoomBookings
    router.get("/", roomBookings.findAll);
    // Retrieve a single RoomBooking with id
    router.get("/find/:id", authorize(["admin","user"]), roomBookings.findOne);
    // Search by user ID
    router.get("/user/:id", authorize(["admin"]), roomBookings.findByUser);
    // find by room id  
    router.get("/room/:id", authorize(["admin","user"]), roomBookings.findByRoom);
    //find by date
    router.get("/date/:date", roomBookings.findByDate);
    //find by start end room
    router.get("/startendroom", authorize(["admin","user"]), roomBookings.findByStartEndRoom);
    //

    // Register the router with the app
    app.use('/api/roombookings', router);

    
    
};
