import Garagestyle from "../../System-admin/Styles/Employees.module.css";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
function EmployeesModal({
  title,
  onClose,
  onSubmit,
  editedEmployee,
  handleInputChange,
  loading,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <div className={Garagestyle.editModal}>
      <div className={Garagestyle.editTitle}>
        <button onClick={onClose}>X</button>
      </div>
      <h2>Edit {editedEmployee.GarageName}</h2>
      <hr style={{ width: "300px", margin: "0 auto 15px" }}></hr>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("GarageName", {
            required: "Garage name is required",
          })}
          type="text"
          placeholder="GarageName"
          defaultValue={editedEmployee.GarageName}
        />
        {errors.GarageName && (
          <span className={Garagestyle.errorMessage}>
            {errors.GarageName.message}
          </span>
        )}

        <input
          {...register("HourPrice", {
            required: "hour price is required",
            pattern: {
              value: /^\d+(\.\d+)?$/, // Regular expression to match only digits
              message: "The entered value should be a number",
            },
          })}
          type="text"
          placeholder="HourPrice"
          defaultValue={editedEmployee.HourPrice}
        />
        {errors.HourPrice && (
          <span className={Garagestyle.errorMessage}>
            {errors.HourPrice.message}
          </span>
        )}

        <input
          {...register("Longitude", {
            required: "Longitude is required",
            pattern: {
              value: /^\d+(\.\d+)?$/, // Regular expression to match only digits
              message: "The entered value should be a number",
            },
            minLength: {
              value: -180,
              message: "Minimum value should be -180",
            },
            maxLength: {
              value: 180,
              message: "Maximum value should be 180",
            },
          })}
          type="text"
          placeholder="longitude"
          defaultValue={editedEmployee.longitude}
        />
        {errors.Longitude && (
          <span className={Garagestyle.errorMessage}>
            {errors.Longitude.message}
          </span>
        )}

        <input
          {...register("Latitude", {
            required: "Latitude is required",
            pattern: {
              value: /^\d+(\.\d+)?$/, // Regular expression to match only digits
              message: "The entered value should be a number",
            },
            minLength: {
                value: -90,
                message: "Minimum value should be -90",
              },
              maxLength: {
                value: 90,
                message: "Maximum value should be 90",
              },
          })}
          type="text"
          placeholder="latitude"
          defaultValue={editedEmployee.latitude}
        />
        {errors.Latitude && (
          <span className={Garagestyle.errorMessage}>
            {errors.Latitude.message}
          </span>
        )}

        <input
          {...register("street", {
            required: "street name is required",
          })}
          type="text"
          placeholder="street"
          defaultValue={editedEmployee.street}
        />
        {errors.street && (
          <span className={Garagestyle.errorMessage}>
            {errors.street.message}
          </span>
        )}

        <input
          {...register("city", {
            required: "city name is required",
          })}
          type="text"
          placeholder="city"
          defaultValue={editedEmployee.city}
        />
        {errors.city && (
          <span className={Garagestyle.errorMessage}>
            {errors.city.message}
          </span>
        )}

        <input
          {...register("TotalSpaces", {
            required: "TotalSpaces is required",
            minLength: 1,
            maxLength: 11,
            pattern: {
              value: /^\d+$/,
              message: "The entered value should be a number",
            },
          })}
          type="text"
          placeholder="TotalSpaces"
          defaultValue={editedEmployee.TotalSpaces}
        />
        {errors.TotalSpaces && (
          <span className={Garagestyle.errorMessage}>
            {errors.TotalSpaces.message}
          </span>
        )}

        <div className={Garagestyle.editModelButtons}>
          <LoadingButton
            endIcon={<EditIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            <span>Edit</span>
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}

export default EmployeesModal;
