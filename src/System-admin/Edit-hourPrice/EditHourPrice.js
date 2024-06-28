// takes time IDK whyyy ??

import React, { useState } from "react";
import AddStyles from "../AddEmployee-component/AddEmployee.module.css";
import PropTypes from "prop-types";
import sweetAlertInstance from "../../helper/SweetAlert";
import { useForm } from "react-hook-form";
import axiosInstance from "../../auth/axios";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";

const Hourprice = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const accessToken = sessionStorage.getItem("accessToken");
  const onSubmit = (data) => {
    setLoading(true);
    axiosInstance
      .put("/api/GarageAdmin/EditHourPrice", data.hourPrice, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Garage's fee updated successfully:", response.data);
        sweetAlertInstance.fire({
          icon: "success",
          title: "Success",
          text: "Garage's fee updated successfully",
        }).then(() => {
          onClose();
          setLoading(false);
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error("Error updating garage's fee:", error);
        sweetAlertInstance.fire({
          icon: "error",
          title: "Error",
          text: `Failed to update garage's fee: ${error.response.data}`,
        });
        setLoading(false);
      });
  };

  return (
    <>
      <div className={AddStyles.addModal}>
        <div className={AddStyles.addTitle}>
          <button onClick={onClose}>{/* Add close icon here */}</button>
        </div>
        <h2>Edit your garage's fee per hour</h2>
        <hr style={{ width: "300px", margin: "0 auto 15px" }}></hr>
        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            {...register("hourPrice", {
              required: {
                value: true,
                message: "new hourPrice is required",
              },
              minLength: 1,
              maxLength: 11,
              pattern: {
                value: /^\d+(\.\d+)?$/, // Regular expression to match only digits
                message: "The entered value should be a number",
              },
            })}
            type="text"
            placeholder="hourPrice"
          />
          {errors.hourPrice && (
            <span className={AddStyles.errorMessage}>
              {errors.hourPrice.message}
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
              <span>Update</span>
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};

Hourprice.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Hourprice;
