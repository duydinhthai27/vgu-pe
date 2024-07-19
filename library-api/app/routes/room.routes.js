const authorize = require("../middlewares/authorize.js");

module.exports = app => {
    const rooms = require("../controllers/room.controller.js");
    const user = require("../controllers/user.controller.js");
    const authorize = require("../middlewares/authorize.js");
    var router = require("express").Router();

    // Create a new Room
    router.post("/", authorize("admin"), rooms.create);
    // Delete a Room by id
    router.delete("/delete/:id", authorize("admin"), rooms.delete);
    // Delete all Rooms
    router.delete("/delete_all/", authorize("admin"), rooms.deleteAll);
    // Update a Room
    router.put("/update/:id", authorize("admin"), rooms.update);
    // Retrieve all Rooms
    router.get("/", rooms.findAll);
    // Retrieve a single Room with id
    router.get("/find/:id", authorize(["admin","user"]), rooms.findOne);
    // Retrieve all rooms with location
    router.get("/location", authorize(["admin","user"]), rooms.findByLocation);
    //find available
    router.get("/available", authorize(["admin","user"]), rooms.findAllByAvailable);
    //find unavailable
    router.get("/unavailable", authorize(["admin","user"]), rooms.findAllByUnavailable);
    // retrive room numbers
    router.get("/roomnumbers", authorize(["admin","user"]), rooms.findAllRoomNumbers);
    // retive room location
    router.get("/roomlocations", authorize(["admin","user"]), rooms.findAllRoomLocations);
    // get count
    router.get("/count", rooms.count);
    
    

    // Register the router with the app
    app.use('/api/rooms', router);
};
