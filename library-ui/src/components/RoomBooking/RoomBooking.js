import React, { useState, useEffect } from "react";
import "./RoomBooking.css";
import axios from "axios";
import Header from "../Main Page/Header/Header.jsx";
import Final from "../Main Page/PageEnd/Final.jsx";
import Contact from "../Main Page/PageEnd/Contact.jsx";

const RoomBooking = () => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([
    { time: "07:00 - 09:00" },
    { time: "09:00 - 11:00" },
    { time: "11:00 - 13:00" },
    { time: "13:00 - 15:00" },
    { time: "15:00 - 17:00" },
    { time: "17:00 - 19:00" },
    { time: "19:00 - 21:00" },
    { time: "21:00 - 23:00"}
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [name, setName] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const now = new Date();
  const date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  const [UserID, setUser] = useState(null);

  const fetchUserName = async (token) => {
    try {
      const response = await axios.get("http://localhost:6868/api/user/list", {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return [];
    }
  };

  const findUserName = async (ID) => {
    const users = await fetchUserName(accessToken);
    const user = users.find((user) => user.id === ID);
    return `${user.fname} ${user.lname}`;
  };

  async function displayUserName(userID) {
    try {
      const userName = await findUserName(userID);
      return userName;
    } catch (error) {
      console.error("Failed to fetch user name:", error);
    }
  }

  useEffect(() => {
    fetch("http://localhost:6868/api/user/info", {
      headers: {
        'x-access-token': accessToken
      }
    })
    .then(response => response.json())
    .then(data => setUser(data.id))
    .catch(error => console.error('Error fetching user:', error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:6868/api/rooms")
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:6868/api/roombookings/date/${date}`)
      .then((response) => response.json())
      .then(async (data) => {
        console.log("Bookings:", data);
        let updatedBookings = [];
        for (const booking of bookings) {
          for (const roombooking of data) {
            const startTime = new Date(roombooking.StartTime);
            const endTime = new Date(roombooking.EndTime);
            const startHour = startTime.getHours();
            const endHour = endTime.getHours();
            const time = `${startHour}:00 - ${endHour}:00`;
            console.log("Time:", time);
            if (time === booking.time) {
              let userName = await displayUserName(roombooking.ID_User);
              booking[roombooking.ID_Room] = `Booked by ${userName}`;
              booking.booked = true;
            }
          }
          updatedBookings.push(booking);
        }
        setBookings(updatedBookings);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleCellClick = (roomId, time) => {
    setSelectedTime(time);
    setSelectedRoom(roomId);
    setShowModal(true);
  };

  const handleBookingSubmit = () => {
    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }
    setShowModal(false);

    const [startTimeStr, endTimeStr] = selectedTime.split(" - ");
    const startTime = new Date();
    const endTime = new Date();
    startTime.setHours(
      parseInt(startTimeStr.split(":")[0]),
      parseInt(startTimeStr.split(":")[1])
    );
    endTime.setHours(
      parseInt(endTimeStr.split(":")[0]),
      parseInt(endTimeStr.split(":")[1])
    );

    const ID_Room = rooms.find(
      (room) => room.ID_Room.toString() === selectedRoom
    ).ID_Room;

    const bookingData = {
      ID: 0,
      ID_Room: ID_Room,
      ID_User: UserID,
      StartTime: startTime,
      EndTime: endTime,
      Payment_method: name,
    };

    fetch("http://localhost:6868/api/roombookings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": accessToken,
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Booking response:", data);
      })
      .catch((error) => console.error("Error booking room:", error));
      //reload then refresh the page. do all api calls again
      window.location.reload();
  };

  const BookingCell = ({ roomId, booking }) => {
    const [isBooked, setIsBooked] = useState(false);
    const [bookedBy, setBookedBy] = useState("");

    useEffect(() => {
      if (booking[roomId] && booking[roomId].includes("Booked")) {
        setIsBooked(true);
        setBookedBy(booking[roomId]);
      }
    }, [booking, roomId]);

    const handleClick = () => {
      if (isBooked) {
        return; 
      }
      handleCellClick(roomId, booking.time);
    };

    return (
      <td
        onClick={handleClick}
        style={{
          backgroundColor: isBooked ? "lightblue" : "",
          cursor: isBooked ? "not-allowed" : "pointer",
        }}
      >
        {isBooked ? bookedBy : "Available"}
      </td>
    );
  };

  return (
    <div className="backgroundRB">
      <Header />
      <div className="space1" style={{ height: "100px" }}></div>
      <div className="room-booking">
        {showModal && (
          <div className="modal-overlay">
            <div className="modalRB">
              <div className="modal-header">
                <h2>Book Room at {selectedTime}</h2>
                <button onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <div className="modal-content">
                <p>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </p>
                <button onClick={handleBookingSubmit}>Book</button>
              </div>
            </div>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Time</th>
              {rooms.map((room) => (
                <th key={room.ID_Room}>{room.ID_Room}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.time}</td>
                {rooms.map((room) => (
                  <BookingCell
                    key={room.ID_Room}
                    roomId={room.ID_Room.toString()}
                    booking={booking}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space" style={{ height: "200px" }}></div>
      <div className="bottom-container">
        <Final />
        <Contact />
      </div>
    </div>
  );
};

export default RoomBooking;
