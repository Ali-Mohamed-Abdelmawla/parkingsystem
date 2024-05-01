import React, { useState } from "react";
import styles from "../styles/Employees.module.css";
import GarageAdminSelect from "../helper/Garage-admins-select";
import axios from "axios";
import Swal from "sweetalert2";

const baseURL = "https://raknaapi.azurewebsites.net";
const accessToken = sessionStorage.getItem("accessToken");



const ViewModal = ({ reportId, onClose }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const forwardTheComplaint = async () => {
    console.log(reportId);
    try {
      const response = await axios.post(
        `${baseURL}/api/Report/ForwardReport/${reportId}/${selectedValue.value}`,
        {},
        {
          params: {
            reportId: reportId,
            reportReceiverId: selectedValue.value,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Complaint is forwarded succesfully:", response.data);
      Swal.fire("Success", "Complaint is forwarded succesfully", "success").then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error marking complaint as solved:", error);
      Swal.fire("Error", "Error forwarding the complaint", "error");
    }
  };
  return (
    <>
      <div className={styles.viewModal}>
        <div className={styles.viewTitle}></div>
        <div className={styles.modalContent}>
          <GarageAdminSelect
            onGarageAdminSelect={(selectedOption) => {
              console.log(selectedOption);
              setSelectedValue(selectedOption);
            }}
          />
          {selectedValue && (
            <div
              className={styles.modalComplaintsDetails}
            //   style={{ display: "flex", flexDirection: "column" }}
            >
              <>
                <label>
                  <b>Chosen admin: </b> {selectedValue.name}
                </label>
                <br></br>
                <label>
                  <b>garage name:</b> {selectedValue.garageName}
                </label>
                <br></br>
                <label>
                  <b>garage number:</b> {selectedValue.garageId}
                </label>

                <button onClick={forwardTheComplaint}>Forward</button>
              </>
              <button onClick={onClose}>Close</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewModal;
