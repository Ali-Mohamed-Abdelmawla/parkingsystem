import React, { useState } from "react";
import styles from "./ReportsPage.module.css";
import axiosInstance from "../../../auth/axios";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const { darkMode } = useOutletContext();
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const accessToken = sessionStorage.getItem("accessToken");
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    if (description.trim() !== "") {
      try {
        const response = await axiosInstance.post(
          "/api/Report/CreateReport",
          {
            reportMessage: description,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Report submitted:", response.data);
        setSubmitted(true);

        // Show SweetAlert confirmation
        Swal.fire({
          title: "Success!",
          text: "Report submitted successfully!",
          icon: "success",
          customClass: {
            container: darkMode
              ? "custom-swal-container-dark"
              : "custom-swal-container-light",
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            content: "custom-swal-content",
            confirmButton: "custom-swal-confirm-button",
          },
        }).then(() => {
          setLoading(false);
          window.location.reload();
        });
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Status code:", error.response.status);
          if (error.response.status === 500) {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong!",
              icon: "error",
            }).then(() => {
              setLoading(false);
            });
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
          setLoading(false);
        } else {
          console.error("Error:", error.message);
          setLoading(false);
        }
      }
    } else {
      // Alert the user to provide a description
      Swal.fire({
        title: "Error!",
        text: "Please provide a description of the issue.",
        icon: "error",
        customClass: {
          container: darkMode
            ? "custom-swal-container-dark"
            : "custom-swal-container-light",
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          content: "custom-swal-content",
          confirmButton: "custom-swal-confirm-button",
        },
      });
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.container} ${darkMode ? styles["dark-mode"] : ""}`}
    >
      <h2 className={styles.heading}>System issue reporting</h2>
      {/* {submitted && <p className={styles['confirmation-message']}>Report submitted successfully!</p>} */}
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="description">Issue Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            rows="6"
            cols="50"
            aria-label="Issue Description"
          ></textarea>
        </div>
        <LoadingButton
          endIcon={<AddIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          onClick={handleSubmit}
          className={`${styles.submitReport} custom-loading-button`} // Added custom class here

        >
          <span>Submit Report</span>
        </LoadingButton>
      </form>
    </div>
  );
}

export default ReportsPage;
