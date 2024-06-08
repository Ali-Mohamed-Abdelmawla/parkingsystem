import { useState } from "react";
import styles from "../../System-admin/Styles/Employees.module.css";
import GarageAdminSelect from "../../helper/Garage-admins-select";
import axiosInstance from "../../auth/axios";
import Swal from "sweetalert2";





const ViewModal = ({ reportId, onClose }) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const [selectedValue, setSelectedValue] = useState(null);
  const forwardTheComplaint = async () => {
    console.log(reportId);
    try {
      axiosInstance
        .post(
          `/api/Report/ForwardReport/${reportId}/${selectedValue.value}`,
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
        )
        .then((response) => {
          console.log("Complaint is forwarded successfully:", response.data);
          Swal.fire(
            "Success",
            "Complaint is forwarded successfully",
            "success"
          ).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          console.error("Error forwarding complaint:", error);
          Swal.fire("Error", "Failed to forward complaint", "error");
        });
    } catch (error) {
      console.error("Error marking complaint as solved:", error);
      Swal.fire("Error", "Error forwarding the complaint", "error");
    }
  };
  return (
    <>
      <div className={styles.viewModal}>
        <div className={styles.viewTitle}>
          <button onClick={onClose}>{/* Add close icon here */}</button>
        </div>
        <div className={styles.modalContent}>
          <h2>Choose Garage</h2>
          <GarageAdminSelect
            onGarageAdminSelect={(selectedOption) => {
              console.log(selectedOption);
              setSelectedValue(selectedOption);
            }}
          />
          {selectedValue && (
              <div className={styles.name} style={{ marginTop: "20px" }}>
                {" "}
                <span className={styles.block}>
                  <b>Chosen admin: </b>{" "}
                  <span className={styles.data}>{selectedValue.name}</span>
                </span>
                <br></br>
                <span className={styles.block}>
                  <b>garage name: </b>{" "}
                  <span className={styles.data}>{selectedValue.garageName}</span>
                </span>
                <br></br>
                <span className={styles.block}>
                  <b>garage number:</b>{" "}
                  <span className={styles.data}>{selectedValue.garageId}</span>
                </span>
                <div className={styles.editModelButtons}>

                <button onClick={forwardTheComplaint}>Forward</button>
                </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewModal;
