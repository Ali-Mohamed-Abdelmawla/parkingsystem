//======================================= react hook form =================================================
import { useState } from "react";
import AddStyles from "./AddReport.module.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosInstance from "../../auth/axios";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
const AddReport = ({ onClose }) => {
  const [addFormOpen, setAddFormOpen] = useState(true);
  const accessToken = sessionStorage.getItem("accessToken");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    axiosInstance
      .post(`/api/Report/CreateReport`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Complaint submitted successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          // text: ` ${response.data.Message}`,
          text: `Report submitted successfully`,

        });
        handleCloseAddBtn();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error submitting complaint:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to submit the complaint: ${error.response.data}`,
        });
        setLoading(false);
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
            <button onClick={handleCloseAddBtn}></button>
          </div>
          <h2>Add a report</h2>
          <hr style={{ width: "300px", margin: "0 auto 15px" }}></hr>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              type="text"
              name="reportMessage"
              placeholder="reportMessage"
              {...register("reportMessage", {
                required: "Report message should be written.",
              })}
            />
            {errors.reportMessage && (
              <span className={AddStyles.errorMessage}>
                {errors.reportMessage.message}
              </span>
            )}

            <div className={AddStyles.addModelButtons}>
              <LoadingButton
                endIcon={<AddIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                <span>Add</span>
              </LoadingButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddReport;
