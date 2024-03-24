import React, { useState } from "react";
import AddStyles from "./AddEmployee.module.css";
import Close from "../assets/light-mode/Close-icon.svg";
import Proptypes from "prop-types";

const AddEmployee = ({ onClose }) => {
  const [addFormOpen, setAddFormOpen] = useState(true);

  const handleCloseAddBtn = () => {
    setAddFormOpen(false);
    onClose();
  };

  AddEmployee.propTypes = {
    onClose: Proptypes.func.isRequired,
  };

  return (
    <>
      {addFormOpen && (
        <div className={AddStyles.addModal}>
          <div className={AddStyles.addTitle}>
            <button onClick={handleCloseAddBtn}>
              <img src={Close} alt="Close" />
            </button>
          </div>
          <form>
            <label>
              <b>Add</b>
            </label>
            <input
              required
              type="text"
              name="employeeName"
              placeholder="Name"
            />

            <input
              required
              type="text"
              min="0"
              id="number"
              name="phoneNumber"
              placeholder="phoneNumber"
              maxLength={11}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              }}
            />
            <input
              required
              type="text"
              min="0"
              id="number"
              name="Garage_id"
              placeholder="Garage_id"
              maxLength={6}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              }}
            />

            <select required name="Role">
              <option value="">What kind of employee ?</option>
              <option value="Systemadmin">System-admin</option>
              <option value="Customerservice">Customer-service</option>
              <option value="Technicalsupport">Technical-support</option>
              <option value="Staff">Staff</option>
            </select>

            <input
              required
              type="text"
              min="0"
              id="number"
              name="National_id"
              placeholder="National_id"
              maxLength={14}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              }}
            />

            <input
              required
              type="text"
              min="0"
              id="number"
              name="Salary"
              placeholder="Salary"
              maxLength={11}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              }}
            />

            <div className={AddStyles.addModelButtons}>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddEmployee;
