import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./UserProfile.css";
import Header from "../Main Page/Header/Header.jsx";
import Contact from "../Main Page/PageEnd/Contact.jsx";
import Final from "../Main Page/PageEnd/Final.jsx";

const UserProfile = ({ user }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [bbook, setBooks]=useState('');

  useEffect(() => {
    const fetchBooks = async (accessToken) => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('Access token not found in localStorage');
          return;
        }
        const response = await axios.get(`http://localhost:6868/api/borrows?ID_User=2`, {
          headers: {
            'x-access-token': accessToken
          }
        });
        
        setBooks(response.data.values);
        console.log(response.data.values);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSaveProfile = () => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .put(`http://localhost:6868/api/user/update/${editedUser.ID}`, editedUser, {
        headers: {
          "x-access-token": accessToken,
        },
      })
      .then((response) => {
        setEditedUser(response.data);
        setShowEdit(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error editing user:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  return (
    <div className="backgroundUP">
      <Header />
      {/* <div className="space1" style={{ height: "100px" }}></div> */}
      <div className="user-profile">
        <h1>User Profile</h1>
        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="personal-info">
            <div className="info-text">
              <p>
                <strong>Name:</strong> {user.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {editedUser.email || "N/A"}
              </p>
              <p>
                <strong>First Name:</strong> {editedUser.fname || "N/A"}
              </p>
              <p>
                <strong>Last Name:</strong> {editedUser.lname || "N/A"}
              </p>
              <p>
                <strong>ID:</strong> {user.ID || "N/A"}
              </p>
              <p>
                <strong>Role:</strong> {user.role || "N/A"}
              </p>
              <p>
                <strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}
              </p>
              <p>
                <strong>Club ID:</strong> {user.club_id || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {editedUser.address || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="profile-section">
          <h2>Borrowed Books</h2>
          <div className="book-list">
            {bbook.length > 0 ? (
              bbook.map((book, index) => (
                <div key={index} className="book-item">
                  <img src={book.Book.image_url|| "https://via.placeholder.com/50"} alt={book.Book.title} className="book-image" />
                  <div className="book-details">
                    <p><strong>ID_Rent:</strong> {book.ID_Rent || "N/A"}</p>
                    <p><strong>Issue_Date:</strong> {book.Issue_Date || "N/A"}</p>
                    <p><strong>Return_Date:</strong> {book.Return_Date || "N/A"}</p>
                    <p><strong>Book Title:</strong> {book.Book.title || "N/A"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No borrowed books</p>
            )}
          </div>
        </div>
        <div className="edit-profile-button">
          <button onClick={() => setShowEdit(true)}>Edit Profile</button>
        </div>
      </div>
      <div className="space" style={{ height: "1600px" }}></div>
      <div className="bottom-container">
        <Final />
        <Contact />
      </div>
      <Modal
        isOpen={showEdit}
        onRequestClose={() => setShowEdit(false)}
        contentLabel="Edit Profile"
        className="modalUP"
        overlayClassName="overlayUP"
      >
        <h2>Edit Profile</h2>
        <form>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="fname"
              value={editedUser.fname || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lname"
              value={editedUser.lname || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={editedUser.email || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={editedUser.address || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={handleSaveProfile}>
              Save
            </button>
            <button type="button" onClick={() => setShowEdit(false)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserProfile;
