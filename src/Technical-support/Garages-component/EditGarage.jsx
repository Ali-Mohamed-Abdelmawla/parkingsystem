import Garagestyle from "../../System-admin/Styles/Employees.module.css";
import { useForm } from "react-hook-form";

function EmployeesModal({
  title,
  onClose,
  onSubmit,
  editedEmployee,
  handleInputChange,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //  handleInputChange = (e) => {
  //   // Assuming you have a way to update the form values in your state
  //   // For example, if you're using a state variable to hold the form values
  //   // You would update that state here instead of directly manipulating the DOM
  //   // This is just a placeholder to show where you'd handle input changes
  //   console.log(e.target.name, e.target.value);
  // };

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
          {...register("Longitude", {
            required: "Longitude is required",
            pattern: {
              value: /^\d+$/,
              message: "The entered value should be a number",
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
              value: /^\d+$/,
              message: "The entered value should be a number",
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
          <button type="submit">Edit</button>
        </div>
      </form>
    </div>
  );
}

export default EmployeesModal;
