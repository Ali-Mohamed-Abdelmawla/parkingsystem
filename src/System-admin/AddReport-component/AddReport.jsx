//======================================= react hook form =================================================
import React, { useState } from "react";
import axios from "axios";
import AddStyles from "./AddReport.module.css";
import PropTypes from "prop-types";
import Swal from 'sweetalert2';
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";


const baseURL = "https://raknaapi.azurewebsites.net";


const AddReport = ({ onClose }) => {
 const [addFormOpen, setAddFormOpen] = useState(true);
 const accessToken = sessionStorage.getItem("accessToken");
 const { register, handleSubmit, formState: { errors } } = useForm();

 const onSubmit = (data) => {

//   const modifiedData = {
//   data
//  };
console.log(data)
    axios
      .post(
        `${baseURL}/api/Report/CreateReport`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Complaint submitted successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: ` ${response.data.Message}`,
        });
        handleCloseAddBtn();
      })
      .catch((error) => {
        console.error("Error submitting complaint:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to submit the complaint: ${error.response.data}`,
        });
      });
 };

 const handleCloseAddBtn = () => {
    setAddFormOpen(false);
    onClose();
 };

 AddReport.propTypes = {
    onClose: PropTypes.func.isRequired,
 };

 return (
    <>
      {addFormOpen && (
        <div className={AddStyles.addReportModal}>
          <div className={AddStyles.addTitle}>
            <button onClick={handleCloseAddBtn}>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <b>Add a report</b>
            </label>
            <textarea
              type="text"
              name="reportMessage"
              placeholder="reportMessage"
              {...register("reportMessage", { required: "Report message should be written." })}
            />
            {errors.reportMessage && <span className={AddStyles.errorMessage}>{errors.reportMessage.message}</span>}

            <div className={AddStyles.addModelButtons}>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      )}
    </>
 );
};

export default AddReport;