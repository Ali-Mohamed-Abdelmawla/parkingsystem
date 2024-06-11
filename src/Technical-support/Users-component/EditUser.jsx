import Employeestyle from "../../System-admin/Styles/Employees.module.css";
import { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { useForm, Controller } from "react-hook-form";
import AllGaragesSelect from "../../helper/All-Garages-select/All-Garages-select";

function UsersModal({
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
    control,
  } = useForm();

  const customStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      background: "var(--input-background-color)",
      color: "var(--font-color) !important",
      display: "flex",
      width: "100%",
      flexWrap: "nowrap",
      borderColor: isFocused ? "var(--special-color1)" : "black",
      boxShadow: "none",
      cursor: "pointer",
      border: "1px solid var(--special-color1)",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        background: "var(--hover-effect-color)",
        border: "1px solid rgba(105, 105, 105, 0.671)",
        boxShadow: "",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "17px",
      color: "var(--font-color) !important",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--special-color1)", // Change the color of the dropdown icon
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      color: "var(--special-color1)", // Change the color of the indicator separator
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: "var(--font-color)", // Change the color of the "No options" message
    }),
    menu: (provided) => ({
      ...provided,
      background: "var(--secondary-color)",
      "::-webkit-scrollbar": {
        width: "12px",
        backgroundColor: "#dfd4b0",
        borderRadius: "10px",
      },
      classNames: "custom-scrollbar", // Add the custom class here
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "var(--special-color1)"
        : isFocused
        ? "var(--color-background) !important"
        : "var(--secondary-color)",
      cursor: "pointer",
    }),
  };

  const [role, setRole] = useState(null);
  const [garageId, setGarageId] = useState(null);

  useEffect(() => {
    setRole(editedEmployee.Role);
    if(editedEmployee.GarageId)
      {
        setGarageId(editedEmployee.GarageId)
      }
  }, [editedEmployee]);

  const roleOptions = [
    { label: "Garage Admin", value: "garageadmin" },
    { label: "Customer Service", value: "customerservice" },
  ];
  const handleChange = (selectedOption, field) => {
    console.log(selectedOption);
    setRole(selectedOption.value);
    field.onChange(selectedOption.value);
  };
  //  handleInputChange = (e) => {
  //   // Assuming you have a way to update the form values in your state
  //   // For example, if you're using a state variable to hold the form values
  //   // You would update that state here instead of directly manipulating the DOM
  //   // This is just a placeholder to show where you'd handle input changes
  //   console.log(e.target.name, e.target.value);
  // };

  return (
    <div className={Employeestyle.editModal}>
      <div className={Employeestyle.editTitle}>
        <button onClick={onClose}>X</button>
      </div>
      <h2>Edit {editedEmployee.UserName}</h2>
      <hr style={{ width: "300px", margin: "0 auto 15px" }}></hr>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("FullName", {
            required: "Full name is required",
          })}
          type="text"
          placeholder="FullName"
          defaultValue={editedEmployee.FullName}
        />
        {errors.FullName && (
          <span className={Employeestyle.errorMessage}>
            {errors.FullName.message}
          </span>
        )}

        <input
          {...register("UserName", {
            required: "User name is required",
            minLength: {
              value: 5,
              message: "Username must be 5 to 20 characters long",
            },
            maxLength: {
              value: 20,
              message: "Username must be 5 to 20 characters long",
            },
          })}
          type="text"
          placeholder="UserName"
          defaultValue={editedEmployee.UserName}
        />
        {errors.UserName && (
          <span className={Employeestyle.errorMessage}>
            {errors.UserName.message}
          </span>
        )}

        <input
          {...register("Email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Please enter a valid email",
            },
          })}
          type="text"
          placeholder="Email"
          defaultValue={editedEmployee.Email}
        />
        {errors.Email && (
          <span className={Employeestyle.errorMessage}>
            {errors.Email.message}
          </span>
        )}

        <input
          {...register("PhoneNumber", {
            required: "Phone number is required",
            minLength: {
              value: 11,
              message: "The entered value should be 11 digits",
            },
            maxLength: {
              value: 11,
              message: "The entered value should be 11 digits",
            },
            pattern: {
              value: /^\d+$/,
              message: "The entered value should be a number",
            },
          })}
          type="text"
          placeholder="PhoneNumber"
          defaultValue={editedEmployee.PhoneNumber}
        />
        {errors.PhoneNumber && (
          <span className={Employeestyle.errorMessage}>
            {errors.PhoneNumber.message}
          </span>
        )}

        {/* <input
          {...register("GarageId", {
            required: "GarageId is required",
            pattern: {
              value: /^\d+$/,
              message: "The entered value should be a number",
            },
          })}
          type="text"
          placeholder="GarageId"
          defaultValue={editedEmployee.GarageId}
        /> */}
        <div style={{ width: "70%",alignSelf: "center" }}>
          <Controller
            name="GarageId"
            control={control}
            rules={{ required: "Garage ID is required" }}
            render={({ field }) => (
              <AllGaragesSelect
                {...field}
                onGarageSelect={(selectedOption) => {
                  console.log(selectedOption);
                  field.onChange(selectedOption.garageId);
                }}
                role={role}
                defValue = {garageId}
              />
            )}
          />
        </div>
        {errors.GarageId && (
          <span className={Employeestyle.errorMessage}>
            {errors.GarageId.message}
          </span>
        )}

        {/* <select
          {...register("Role", {
            required: "Role is required",
          })}
          placeholder="Role"
          defaultValue={editedEmployee.salary}
        >
          <option value="garageadmin">Garage Admin</option>
          <option value="customerservice">Customer Service</option>
        </select> */}
        <div style={{ width: "70%",alignSelf: "center" }}>
            <Controller
              name="Role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Role"
                  // value={
                  //   role
                  //     ? roleOptions.find((option) => option.value === role)
                  //     : null
                  // }
                  // value={field.value ? roleOptions.find(option => option.value === field.value) : null}
                  value={role ? roleOptions.find((option) => option.value === role) : null}
                  defaultValue={role}
                  options={roleOptions}
                  onChange={(selectedOption) => {
                    handleChange(selectedOption, field);
                  }}
                  styles={customStyles}
                />
              )}
            />
          </div>
        {errors.Role && (
          <span className={Employeestyle.errorMessage}>
            {errors.Role.message}
          </span>
        )}

        <div className={Employeestyle.editModelButtons}>
          <button type="submit">Edit</button>
        </div>
      </form>
    </div>
  );
}

export default UsersModal;
