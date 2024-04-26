import React from "react";
import Employeestyle from '../Styles/Employees.module.css'


function EmployeesModal({ title, onClose, onSubmit, editedEmployee, handleInputChange }) {
  
  return (
<div className={Employeestyle.editModal}>
 <div className={Employeestyle.editTitle}>
    <button onClick={onClose}>
    </button>
 </div>
 <form onSubmit={onSubmit}>
    <label>
      {title}
    </label>
    {/* Input fields for editing employee */}
    <input
    required
      type="text"
      name="Name"
      placeholder="FullName"
      defaultValue={editedEmployee.Name}
      onChange={handleInputChange}
    />
    <input
    required
      type="text"
      name="userName"
      placeholder="userName"
      defaultValue={editedEmployee.userName}//Username must be 5 to 20 characters long with no spaces and special characters.
      onChange={handleInputChange}
    />
    <input
    required
      type="text"
      name="Email"
      placeholder="Email"
      defaultValue={editedEmployee.Email}
      onChange={handleInputChange}
    />
    <input
    required
      type="text"
      min="0"
      id="number"
      name="phoneNumber"
      placeholder="phoneNumber"
      maxLength={11}
      defaultValue={editedEmployee.phoneNumber}
      onChange={(e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        handleInputChange(e);
      }}
    />

    <input
    required
      type="text"
      min="0"
      id="number"
      name="NationalId"
      placeholder="National_id"
      maxLength={14}
      defaultValue={editedEmployee.NationalId} //maxlength should be 14
      onChange={(e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        handleInputChange(e);
      }}
    />
    <input
    required
      type="text"
      min="0"
      id="number"
      name="salary"
      placeholder="Salary"
      maxLength={11}
      defaultValue={editedEmployee.salary}
      onChange={(e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        handleInputChange(e);
      }}
    />
    <div className={Employeestyle.editModelButtons}>
      <button type="submit">Edit</button>
    </div>
 </form>
</div>

  );
}

export default EmployeesModal;