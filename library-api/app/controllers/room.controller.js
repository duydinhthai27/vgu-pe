const db = require("../models");  // Adjust the path as necessary to your models folder
const Room = db.rooms; // Ensure 'rooms' is the key used when exporting the Room model from your models index file
const RoomBooking = db.roombookings;
const Op = db.Sequelize.Op;
const fs = require('fs').promises;

// create room from script
exports.createRoomsFromJSON = async (filePath) => {
    try {
        const count = await Room.count();
        if (count > 0) {
            console.log("Rooms in json have been added to the database before.");
            return;
        }
        // Read and parse the JSON file
        const data = await fs.readFile(filePath, 'utf8');
        const rooms = JSON.parse(data);

        // Map the book data to match the Book model fields
        const roomData = rooms.map(room => ({
            ID_Room: room.ID_Room,
            Location: room.Location,
            Availability: room.Availability
        }));

        // if the book data is already in db, do not add
        

        // Bulk create books in the database

        await Room.bulkCreate(roomData);
        console.log("Rooms have been successfully added to the database.");
    } catch (error) {
        console.error("Error reading or saving room data: ", error);
    }
};
// Create and Save a new Room
exports.create = (req, res) => {
    // Validate request
    if (!req.body.ID_Room) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const room = {
        ID_Room: req.body.ID_Room, 
        Location: req.body.Location,
        Availability: req.body.Availability
    };
  
    // Save Tutorial in the database
    Room.create(room)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Room."
        });
      });
  };

// Retrieve all Rooms from the database.
exports.findAll = (req, res) => {
    Room.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving rooms."
            });
        });
};

// Find a single Room by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Room.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Room with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Room with id=" + id
            });
        });
};

// Update a Room by the ID in the request, can update only the Availability, if it marks Unavailable, delete all room booking currently in that room
exports.update = (req, res) => {
    const id = req.params.id;
    Room.update(req.body, {
        where: { ID_Room: id },  
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Room was updated successfully."
                });
            } else {
                res.send({
                    //send back params
                    message: `Cannot update Room with id=${id}. Maybe Room was not found or req.body is empty!`
                });
            }
            // delete all room booking currently in that room (not delete the past booking)
            if (req.body.Availability == "Unavailable") {
                // Delete all future room bookings currently in that room
                RoomBooking.destroy({
                    where: { 
                        ID_Room: id,
                        StartTime: { [Op.gte]: new Date() } // Only delete future bookings
                    }
                })
                    .then(() => {
                        // Perform additional actions if needed
                    })
                    .catch(() => {
                        res.status(500).send({
                            message: "Error deleting future room bookings for Room with id=" + id
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Room with id=" + id
            });
        });
};


// Delete a Room with the specified ID in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Room.destroy({
        where: { ID_Room: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Room was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Room with id=${id}. Maybe Room was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Room with id=" + id
            });
        });
};
//delete all
exports.deleteAll = (req, res) => {
    Room.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Rooms were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all rooms."
            });
        });
};
//find all available rooms, avalability = "Available"
exports.findAllByAvailable = (req, res) => {
    Room.findAll({ where: { Availability: "Available" } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving rooms."
            });
        });
};
//find all unavailable rooms, avalability = "Unavailable"
exports.findAllByUnavailable = (req, res) => {
    Room.findAll({ where: { Availability: "Unavailable" } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving rooms."
            });
        });
};
// find all by location
exports.findByLocation = (req, res) => {
    const location = req.body.Location;
    Room.findAll({ where: { Location: location  } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving rooms."
        });
    });
}
//return list of room numbers 
exports.findAllRoomNumbers = (req, res) => {
    Room.findAll({ attributes: ['ID_Room'] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving rooms."
            });
        });
};
//return all different locations that has room at there (each location only appears once)
exports.findAllRoomLocations = (req, res) => {
    Room.findAll({ attributes: ['Location'], group: ['Location'] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving rooms."
            });
        });
};
// # of room
exports.count = async (req, res) => {
    const count = await Room.count();
    res.status(200).send({ count: count });
};