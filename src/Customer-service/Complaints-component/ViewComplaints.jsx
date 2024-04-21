import React from "react";
import styles from "../styles/Employees.module.css";

const ViewModal = ({ complaint, onClose }) => {
  const current = complaint;
  return (
    <>
      {current && (
        <div className={styles.viewModal}>
          <div className={styles.viewTitle}></div>
          <div className={styles.modalContent}>
            <div className={styles.modalComplaintMain}>
              <div className={styles.name}>
                <label>
                  <b>Report_id:</b> {complaint.reportId}
                </label>
                <label>
                  <b>Report Type:</b> {complaint.reportType}
                </label>
                <label>
                  <b>Reporter Id:</b> {complaint.reporterId}
                </label>
                <label>
                  <b>Report status:</b>{" "}
                  {complaint.isFixed ? "Fixed" : "Not Fixed"}
                </label>
              </div>
            </div>
            <hr />
            <div className={styles.modalComplaintsDetails}>
              <label>
                <b>Report Message:</b> {complaint.reportMessage}
              </label>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewModal;
