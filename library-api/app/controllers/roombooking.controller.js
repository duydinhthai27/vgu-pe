const db = require("../models");
const RoomBooking = db.roombookings;
const Room = db.rooms;
const Op = db.Sequelize.Op;
const User = db.users;
//mailing
const { sendingMail } = require("../controllers/mailing.controller");

const durationToMilliseconds = duration => parseFloat(duration) * 60 * 60 * 1000;

// Create and Save a new RoomBooking
exports.create = async (req, res) => {
    // Validate request, only ID_Room, StartTime and EndTime are required, ID_User is get somehow from token
    if (!req.body.ID_Room || !req.body.StartTime || !req.body.EndTime || !req.body.ID_User) {
        return res.status(400).send({
            message: "ID_Room, StartTime and EndTime are required."
        });
    }
    const user = await User.findByPk(req.body.ID_User);

    // Prepare the regex pattern to extract hours and minutes from Duration
    const durationRegex = /(\d+)h(\d+)m/;

    try {
        // Check if the Room exists
        const room = await Room.findByPk(req.body.ID_Room);
        if (!room) {
            return res.status(404).send({
                message: `Room with ID_Room=${req.body.ID_Room} not found.`
            });
        }

        // Check if the room is available
        if (room.Availability === "Unavailable") {
            return res.status(400).send({
                message: `Room with ID_Room=${req.body.ID_Room} is unavailable.`
            });
        }


        // Create a RoomBooking

        const bookingStartTime = new Date(req.body.StartTime);
        const bookingEndTime = new Date(req.body.EndTime);
        // check if StartTime in interval of any booking of that room, if yes, send message, if no, continue to make room available
        // create array of pair of StartTime and EndTime of every roombooking in that room
        // then compare bookingStartTime and bookingEndTime with every pair of StartTime and EndTime
        // if any of 2 in that pair is in the interval of bookingStartTime and bookingEndTime, return message that StartTime or EndTime is overlap with another booking

        const roomBookings = await RoomBooking.findAll({
            where: {
                ID_Room: req.body.ID_Room
            }
        });
        for (let i = 0; i < roomBookings.length; i++) {
            const roomBooking = roomBookings[i];
            const bookingStart = new Date(roomBooking.StartTime);
            const bookingEnd = new Date(roomBooking.EndTime);
            if ((bookingStartTime >= bookingStart && bookingStartTime <= bookingEnd) || (bookingEndTime >= bookingStart && bookingEndTime <= bookingEnd)) {
                return res.status(400).send({
                    message: `Booking StartTime or EndTime is overlap with another booking.`
                });
            }
        }
        // Check if the booking duration is less than 30 minutes
        if (bookingEndTime - bookingStartTime < durationToMilliseconds("0.5")) {
            return res.status(400).send({
                message: "Booking duration must be at least 30 minutes."
            });
        }


        //if bookingStartTime.getTime() < now(), return message bug
        if (bookingStartTime.getTime() < Date.now()) {
            return res.status(400).send({
                message: "Booking start time cannot be in the past."
            });
        }

        //wait for email confirmation 
        //send email to user to confirm the booking
        // if user confirm the booking, create a new booking

        //sending an email notification to the user

        // Create the booking object

    
        const roomBooking = {
            ID: req.body.ID,
            ID_Room: req.body.ID_Room,
            ID_User: req.body.ID_User,
            StartTime: req.body.StartTime,
            EndTime: req.body.EndTime,
            Payment_method: req.body.Payment_method,
        };
        //make the room booking, the at the bookingStartTime, mark that room as Unavailable and make it Available at bookingEndTime
        const newRoomBooking = await RoomBooking.create(roomBooking);
        //send 
        res.send(newRoomBooking);
        const subject = 'Room Booking created';
        //text are details of the booking
        const text = `Your booking has been created. Details: Room: ${room.ID_Room}, Start Time: ${roomBooking.StartTime}, End Time: ${roomBooking.EndTime}, Description: ${roomBooking.Payment_method}`;
        //notify user of the booking
        sendingMail({
            from: "no-reply@example.com",
            to: `${user.email}`,
            subject: `${subject}`,
            text: `Hello, ${user.username}, ${text}`,
          });

    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the RoomBooking."
        });
    }
};



// Retrieve all RoomBookings from the database.
exports.findAll = (req, res) => {
    RoomBooking.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving room bookings."
            });
        });
};

// Find a single RoomBooking by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    RoomBooking.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find RoomBooking with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving RoomBooking with id=" + id
            });
        });
};

// Update a RoomBooking by the ID in the request, only be updating by admin and its own user
exports.update = async (req, res) => {
    //ID_User must match or only admin to update the booking
    const id = req.params.id;
    const user = await User.findByPk(req.body.ID_User);
    // const user to find user to send mail
    RoomBooking.findByPk(id)
        .then(data => {
            if (req.body.ID_User !== data.ID_User && req.user.role !== "admin") {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
            if (data) {
                RoomBooking.update(req.body, {
                    where: { ID: id }
                })
                    .then(num => {
                        if (num == 1) {
                            res.send({
                                message: "RoomBooking was updated successfully."
                            });
                            
                            //send mail
                            const subject = 'Room Booking updated';
                            //text are details of the booking
                            const text = `Your booking has been updated. Details: Room: ${data.ID_Room}, Start Time: ${data.StartTime}, End Time: ${data.EndTime}`;
                            //notify user of the booking
                            sendingMail({
                                from: "no-reply@example.com",
                                to: `${user.email}`,
                                subject: `${subject}`,
                                text: `Hello, ${user.username}, ${text}`,
                              });
                            
                        } else {
                            res.send({
                                message: `Cannot update RoomBooking with id=${id}. Maybe RoomBooking was not found or req.body is empty!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating RoomBooking with id=" + id
                        });
                    });
            } else {
                res.status(404).send({
                    message: `Cannot find RoomBooking with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving RoomBooking with id=" + id
            });
        });
};

// Delete a RoomBooking with the specified ID in the request (similar to update)
exports.delete = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(req.body.ID_User);
    RoomBooking.findByPk(id)
        .then(data => {
            if (req.body.ID_User !== data.ID_User && req.user.role !== "admin") {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
            if (data) {
                RoomBooking.destroy({
                    where: { ID: id }
                })
                    .then(num => {
                        if (num == 1) {
                            res.send({
                                message: "RoomBooking was deleted successfully!"
                            });
                            // subject
                            const subject = 'Room Booking deleted';
                            //text are details of the booking
                            const text = `Your booking has been deleted. Details: Room: ${data.ID_Room}, Start Time: ${data.StartTime}, End Time: ${data.EndTime}`;
                            //notify user of the booking
                            sendingMail({
                                from: "no-reply@example.com",
                                to: `${user.email}`,
                                subject: `${subject}`,
                                text: `Hello, ${user.username}, ${text}`,
                              });
                        } else {
                            res.send({
                                message: `Cannot delete RoomBooking with id=${id}. Maybe RoomBooking was not found!`
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Could not delete RoomBooking with id=" + id
                        });
                    });
            } else {
                res.status(404).send({
                    message: `Cannot find RoomBooking with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving RoomBooking with id=" + id
            });
        });
};
//delete all
exports.deleteAll = (req, res) => {
    RoomBooking.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} RoomBookings were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all room bookings."
            });
        });
};

// Find all RoomBookings of a User
exports.findByUser = (req, res) => {
    const id = req.params.id;

    RoomBooking.findAll({ where: { ID_User: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred while retrieving RoomBookings of User with ID=${id}.`
            });
        });
};
// Find all RoomBookings of a Room
exports.findByRoom = (req, res) => {
    const id = req.params.id;

    RoomBooking.findAll({ where: { ID_Room: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred while retrieving RoomBookings of Room with ID=${id}.`
            });
        });
};
// find all booking by date as /yyyy-mm-dd
exports.findByDate = (req, res) => {
    const date = req.params.date;
    const year = date.split("-")[0];
    const month = date.split("-")[1];
    const day = date.split("-")[2];
    const date_to_compare = new Date(year, month - 1, day);
    // get booking has date yyyy-mm-dd same as date
    // just compare date, not exactly in hour and minute
    RoomBooking.findAll({ where: { StartTime: { [Op.gte]: date_to_compare }, EndTime: { [Op.lt]: new Date(new Date(date_to_compare).setDate(new Date(date_to_compare).getDate() + 1)) } } })
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred while retrieving RoomBookings of date=${date}.`
            });
        }
        );
};
// find by starttime and endtime and ID_Room , data take from req.body
exports.findByStartEndRoom = (req, res) => {
    const room_ID = req.body.ID_Room;
    const StartTime = req.body.StartTime;
    const EndTime = req.body.EndTime;

    RoomBooking.findAll({ where: { ID_Room: room_ID, StartTime: StartTime, EndTime: EndTime } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred while retrieving RoomBookings of Room with ID=${room_ID}.`
            });
        });
};
// get booking in one day
exports.findByDay = (req, res) => {
    const date = req.params.date;
    RoomBooking.findAll({
        where: {
            StartTime: {
                [Op.gte]: date,
                [Op.lt]: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
            }
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred while retrieving RoomBookings of date=${date}.`
            });
        });
};
