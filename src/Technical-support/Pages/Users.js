import React, { useState } from "react";
import styles from "./Users.module.css";
import ViewLight from "../assets/LightMode/view.svg";
import ViewDark from "../assets/DarkMode/view-dark.svg";
import CloseLight from "../assets/LightMode/false.svg";
import CloseDark from "../assets/DarkMode/false-dark.svg";
import { useOutletContext } from "react-router-dom";

const Employees = ({ handleDarkModeToggle }) => {

    const  {darkmode}  = useOutletContext();

  const [expandedRow, setExpandedRow] = useState(-1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletionIndex, setDeletionIndex] = useState(null);
  const [showEditPage, setShowEditPage] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [viewIndex, setViewIndex] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({
    Name: "",
    NationalId: "",
    Email: "",
    role: "",
    phoneNumber: "",
    garageId: "",
  });
  const [Employees, setEmployees] = useState([
    {
      Name: "Ahmed Mahmoud Ali",
      NationalId: "12345678901234",
      Email: "ahmed.mahmoud@example.com",
      role: "customerservices",
      phoneNumber: "01123456789",
      garageId: "90",
    },
    {
      Name: "Sara Abdullah Mohamed",
      NationalId: "98765432109876",
      Email: "sara.abdullah@example.com",
      role: "customerservices",
      phoneNumber: "01098765432",
      garageId: "88",
    },
    {
      Name: "Mohamed Khaled Ahmed",
      NationalId: "56789012345678",
      Email: "mohamed.khaled@example.com",
      role: "garageadmin",
      phoneNumber: "01234567890",
      garageId: "35",
    },
    {
      Name: "Fatma Ali Hassan",
      NationalId: "34567890123456",
      Email: "fatma.ali@example.com",
      role: "customerservices",
      phoneNumber: "01567890123",
      garageId: "76",
    },
    {
      Name: "Ali Ahmed Hassan",
      NationalId: "01234567890123",
      Email: "ali.ahmed@example.com",
      role: "garageadmin",
      phoneNumber: "01876543210",
      garageId: "37",
    },
  ]);

  const saveToLocalStorage = () => {
    localStorage.setItem("Employees", JSON.stringify(Employees));
  };

  const toggleDropdown = (index) => {
    setExpandedRow(expandedRow === index ? -1 : index);
  };

  const handleEditClick = (index) => {
    setShowEditPage(true);
    setEditIndex(index);
    setEditedEmployee({ ...Employees[index] });
    document.body.classList.add("Edit-modal-active");
  };

  const handleCloseEditClick = () => {
    setShowEditPage(false);
    document.body.classList.remove("Edit-modal-active");
  };

  const handleDeleteClick = (index) => {
    setShowDeleteConfirmation(true);
    setDeletionIndex(index);
    document.body.classList.add("delete-modal-active");
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeletionIndex(null);
    document.body.classList.remove("delete-modal-active");
  };

  const handleConfirmDelete = () => {
    const updatedEmployees = [...Employees];
    updatedEmployees.splice(deletionIndex, 1);
    setEmployees(updatedEmployees);
    setShowDeleteConfirmation(false);
    setDeletionIndex(null);
    saveToLocalStorage();
    document.body.classList.remove("delete-modal-active");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevEditedEmployee) => ({
      ...prevEditedEmployee,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !editedEmployee.Name ||
      !editedEmployee.Email ||
      !editedEmployee.NationalId ||
      !editedEmployee.role ||
      !editedEmployee.phoneNumber ||
      !editedEmployee.garageId
    ) {
      alert("Please fill in all fields before saving.");
      return;
    }
    const updatedEmployees = [...Employees];
    updatedEmployees[editIndex] = editedEmployee;
    setEmployees(updatedEmployees);
    setShowEditPage(false);
    setEditIndex(null);
    saveToLocalStorage();
    document.body.classList.remove("Edit-modal-active");
  };

  const handleViewClick = (index) => {
    setShowViewDetails(true);
    setViewIndex(index);
    document.body.classList.add("view-modal-active");
  };

  const handleCloseView = () => {
    setShowViewDetails(false);
    setViewIndex(null);
    document.body.classList.remove("view-modal-active");
  };

  const darkModeClass = darkmode ? styles["dark-mode"] : "";

  return (
    <div className={`${styles["component-body"]} ${darkModeClass}`}>
      <div
        className={styles["toggle-dark-mode"]}
        onClick={handleDarkModeToggle}
      >
        {darkmode ? "Light Mode" : "Dark Mode"}
      </div>
      <table className={`${styles["table-content"]} ${darkModeClass}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>National ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone Number</th>
            <th>Garage ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.Name}</td>
              <td>{employee.NationalId}</td>
              <td>{employee.Email}</td>
              <td>{employee.role}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.garageId}</td>
              <td>
                <div
                  className={`${styles["details-dropdown"]} ${darkModeClass}`}
                  onClick={() => toggleDropdown(index)}
                >
                  <img
                    src={darkmode ? ViewDark : ViewLight}
                    alt="Details"
                    className={styles["expand-icon"]}
                  />
                  {index === expandedRow && (
                    <div className={styles["dropdown-menu"]}>
                      <button
                        className={styles["dropdown-button"]}
                        onClick={() => handleViewClick(index)}
                      >
                        View
                      </button>
                      <hr />
                      <button
                        className={styles["dropdown-button"]}
                        onClick={() => handleEditClick(index)}
                      >
                        Edit
                      </button>
                      <hr />
                      <button
                        className={styles["dropdown-button"]}
                        onClick={() => handleDeleteClick(index)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteConfirmation && (
        <div className={`${styles["delete-confirmation"]} ${darkModeClass}`}>
          <div className={`${styles["border"]} ${darkModeClass}`}></div>
          <div className={`${styles["delete-content"]} ${darkModeClass}`}>
            <p>Are you sure to delete this User?</p>
            <button className={styles["button1"]} onClick={handleConfirmDelete}>
              Confirm
            </button>
            <button className={styles["button2"]} onClick={handleCancelDelete}>
              No
            </button>
          </div>
        </div>
      )}

      {showEditPage && (
        <div className={`${styles["edit-modal"]} ${darkModeClass}`}>
          <div className={`${styles["add-title"]} ${darkModeClass}`}>
            <button
              className={`${styles["but"]} ${darkModeClass}`}
              onClick={handleCloseEditClick}
            >
              <img
                src={darkmode ? CloseDark : CloseLight}
                alt="close"
                className={styles["icon-close"]}
              />
            </button>
          </div>
          <form onSubmit={handleFormSubmit}>
            <label>Edit User &nbsp;</label>
            <div className="form-content">
              <input
                type="text"
                name="Name"
                placeholder="Name"
                value={editedEmployee.Name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="NationalId"
                placeholder="National ID"
                value={editedEmployee.NationalId}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="Email"
                placeholder="Email"
                value={editedEmployee.Email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={editedEmployee.role}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={editedEmployee.phoneNumber}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="garageId"
                placeholder="Garage ID"
                value={editedEmployee.garageId}
                onChange={handleInputChange}
              />
            </div>
            <div className={`${styles["edit-model-buttons"]} ${darkModeClass}`}>
              <button type="submit">Edit</button>
            </div>
          </form>
        </div>
      )}

      {showViewDetails && (
        <div className={`${styles["view-modal"]} ${darkModeClass}`}>
          <div className={`${styles["view-title"]} ${darkModeClass}`}></div>
          <div className={`${styles["modal-content"]} ${darkModeClass}`}>
            <div className={`${styles["modal-main"]} ${darkModeClass}`}>
              <div className={`${styles["name"]} ${darkModeClass}`}>
                <label>
                  <b>Name:</b> {Employees[viewIndex].Name}
                </label>
                <label>
                  <b>National ID:</b> {Employees[viewIndex].NationalId}
                </label>
              </div>
            </div>
            <div className={`${styles["modal-details"]} ${darkModeClass}`}>
              <label>
                <b>Email:</b> {Employees[viewIndex].Email}
              </label>
              <label>
                <b>Role:</b> {Employees[viewIndex].role}
              </label>
              <label>
                <b>Phone Number:</b> {Employees[viewIndex].phoneNumber}
              </label>
              <label>
                <b>Garage ID:</b> {Employees[viewIndex].garageId}
              </label>
              <div
                className={`${styles["view-close-buttons"]} ${darkModeClass}`}
              >
                <button onClick={handleCloseView}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
