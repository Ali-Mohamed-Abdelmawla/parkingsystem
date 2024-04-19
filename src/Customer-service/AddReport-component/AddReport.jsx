//====================================== react hook form =================================================
import React, { useState } from "react";
import axios from "axios";
import AddStyles from "./AddReport.module.css";
import PropTypes from "prop-types";
import Swal from 'sweetalert2';
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

const baseURL = "https://raknaapi.azurewebsites.net";

const reportTypeOptions = [
  { value: "Other", label: "Other" },
  { value: "SystemError", label: "System Error" },
  { value: "BillingError", label: "Billing Error" },
  { value: "ServiceDelay", label: "Service Delay" },
  { value: "EquipmentIssue", label: "Equipment Issue" },
  { value: "PolicyViolation", label: "Policy Violation" },
  { value: "CustomerFeedback", label: "Customer Feedback" },
];
const AddReport = ({ onClose }) => {
 const [addFormOpen, setAddFormOpen] = useState(true);
 const accessToken = sessionStorage.getItem("accessToken");
 const { register, handleSubmit, control, formState: { errors } } = useForm();

 const onSubmit = (data) => {
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
          text: "Complaint submitted successfully",
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
        <div className={AddStyles.addModal}>
          <div className={AddStyles.addTitle}>
            <button onClick={handleCloseAddBtn}>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <b>Add</b>
            </label>
            <Controller
              name="reportType"
              control={control}
              rules={{ required: "Report type is required." }}
              render={({ field }) => (
                <Select
                 {...field}
                 options={reportTypeOptions}
                 placeholder="Select Report Type"
                 isClearable
                />
              )}
            />
            {errors.reportType && <p>{errors.reportType.message}</p>}
            <input
              required
              type="text"
              name="reportMessage"
              placeholder="reportMessage"
              {...register("reportMessage", { required: "Report message is required." })}
            />
            {errors.reportMessage && <p>{errors.reportMessage.message}</p>}

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
