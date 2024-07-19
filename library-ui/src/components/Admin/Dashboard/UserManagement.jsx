import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./UserManagement.css";
import Header from "../../Main Page/Header/Header";
import Final from "../../Main Page/PageEnd/Final";
import Contact from "../../Main Page/PageEnd/Contact";

Modal.setAppElement("#root"); // Ensure to set the app element for accessibility

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "", // Ensure to collect password as well
    role: "user", // Default role
  });
  const [editUserRole, setEditUserRole] = useState("user");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found in localStorage");
          return;
        }
        const response = await axios.get("http://localhost:6868/api/user/list", {
          headers: {
            "x-access-token": accessToken,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAddUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUserSubmit = () => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .post("http://localhost:6868/api/auth/register", newUser, {
        headers: {
          "x-access-token": accessToken,
        },
      })
      .then((response) => {
        setUsers([...users, response.data]);
        setShowAddUserModal(false);
        setNewUser({
          username: "",
          fname: "",
          lname: "",
          email: "",
          password: "",
          role: "user",
        });
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const handleDeleteUser = (userId) => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .delete(`http://localhost:6868/api/user/delete/${userId}`, {
        headers: {
          "x-access-token": accessToken,
        },
      })
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEditUserRole = () => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .put(`http://localhost:6868/api/user/update/${selectedUser.id}`, { role: editUserRole }, {
        headers: {
          "x-access-token": accessToken,
        },
      })
      .then((response) => {
        setUsers(users.map((user) => (user.id === selectedUser.id ? response.data : user)));
        setShowEditUserModal(false);
        setShowUserDetailsModal(false);
        setSelectedUser(null);
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
      });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.fname.toLowerCase().includes(search.toLowerCase()) ||
      user.lname.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="space1" style={{ height: "100px" }}></div>
      <div className="user-management">
        <h1>User Management</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by username, name or email"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="search-button" onClick={() => setSearch(search)}>
            Search
          </button>
          <button
            className="add-user-button"
            onClick={() => setShowAddUserModal(true)}
          >
            + Add New User
          </button>
        </div>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <React.Fragment key={user.id}>
                <tr>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{`${user.fname} ${user.lname}`}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="more-button"
                      onClick={() => {
                        setSelectedUser(selectedUser === user ? null : user);
                        setShowUserDetailsModal(true);
                      }}
                    >
                    More
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setSelectedUser(user);
                        setEditUserRole(user.role);
                        setShowEditUserModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
                {selectedUser === user && (
                  <tr className="user-details">
                    <td colSpan="5">
                      <div className="details">
                        <p>
                          <strong>Role:</strong> {user.role}
                        </p>
                        <p>
                          <strong>Created at:</strong>{" "}
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button className="page-button">1</button>
          <button className="page-button">2</button>
          <button className="page-button">3</button>
          <button className="page-button">4</button>
        </div>

        <Modal
          isOpen={showAddUserModal}
          onRequestClose={() => setShowAddUserModal(false)}
          contentLabel="Add User Modal"
          className="modalUM"
          overlayClassName="overlayUM"
        >
          <div className="modal-content">
            <h2>Add New User</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleAddUserChange}
            />
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              value={newUser.fname}
              onChange={handleAddUserChange}
            />
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              value={newUser.lname}
              onChange={handleAddUserChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleAddUserChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleAddUserChange}
            />
            <button onClick={handleAddUserSubmit}>Add User</button>
            <button onClick={() => setShowAddUserModal(false)}>Cancel</button>
          </div>
        </Modal>

        <Modal
          isOpen={showEditUserModal}
          onRequestClose={() => setShowEditUserModal(false)}
          contentLabel="Edit User Modal"
          className="modalUM"
          overlayClassName="overlayUM"
        >
          <div className="modal-content">
            <h2>Edit User Role</h2>
            <select
              value={editUserRole}
              onChange={(e) => setEditUserRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
            <button onClick={handleEditUserRole}>Save</button>
            <button onClick={() => setShowEditUserModal(false)}>Cancel</button>
          </div>
        </Modal>

        {/* Modal for displaying user details */}
        <Modal
          isOpen={showUserDetailsModal}
          onRequestClose={() => {setShowUserDetailsModal(false); setSelectedUser(null)}}
          contentLabel="User Details Modal"
          className="modalUM"
          overlayClassName="overlayUM"
        >
          <div className="modal-content">
            <h2>User Details</h2>
            {selectedUser && (
              <div className="details">
                <p>
                  <strong>ID:</strong> {selectedUser.id}
                </p>
                <p>
                  <strong>Username:</strong> {selectedUser.username}
                </p>
                <p>
                  <strong>Name:</strong> {`${selectedUser.fname} ${selectedUser.lname}`}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Role:</strong> {selectedUser.role}
                </p>
                <p>
                  <strong>Created at:</strong>{" "}
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
            <button onClick={() => {setShowUserDetailsModal(false); setSelectedUser(null)}}>Close</button>
          </div>
        </Modal>
      </div>
      <div className="space" style={{ height: "600px" }}></div>
      <div className="bottom-container">
        <Final />
        <Contact />
      </div>
    </div>
  );
};

export default UserManagement;
