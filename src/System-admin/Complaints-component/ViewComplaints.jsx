import { useEffect } from "react";
import styles from "../Styles/Employees.module.css";

const ViewModal = ({ complaint, onClose }) => {
  const current = complaint;
  useEffect(() => {
    console.log(complaint);
  }, []);
  return (
    <>
      {current && (
        <div className={styles.viewModal}>
          <div className={styles.viewTitle}></div>
          <h2>Complaint #{complaint.ReportId} Details</h2>
          <hr style={{ width: "300px", margin: "0 auto 15px" }}></hr>
          <div className={styles.modalContent}>
            <div className={styles.name}>
              <span className={styles.block}>
                <b>Complaint ID:</b>{" "}
                <span className={styles.data}>{complaint.ReportId}</span>
              </span>
              <br />

              <span className={styles.block}>
                <b>Complaint Type:</b>{" "}
                <span className={styles.data}>{complaint.ReportType}</span>
              </span>
              <br />

              <span className={styles.block}>
                <b>Reported By:</b>{" "}
                <span className={styles.data}>{complaint.ReporterName}</span>
              </span>
              <br />

              <span className={styles.block}>
                <b>Status:</b>{" "}
                <span className={styles.data}>
                  {complaint.IsFixed ? "Fixed" : "Not Fixed"}
                </span>
              </span>
              <br />
              
              <span className={styles.block}>
                <b>Complaint Details:</b>{" "}
                <span className={styles.data}>{complaint.ReportMessage}</span>
              </span>
              <br />

              <div className={styles.editModelButtons}>
                <button className={styles.viewButton} onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewModal;