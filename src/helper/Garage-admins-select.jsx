import React, { useState, useEffect } from "react";
import Select,{ components } from "react-select";
import axiosInstance from "../auth/axios";
import "./Garage-admins-select.css";
import "../System-admin/Styles/main.css";

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
    transition: 'all 0.3s ease-in-out',
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
const GarageAdminSelect = ({ onGarageAdminSelect }) => {
  const [garageAdmins, setGarageAdmins] = useState([]);
  const [selectedGarageAdmin, setSelectedGarageAdmin] = useState(null);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    console.log(accessToken);
    if (!accessToken) {
      return;
    }
    const fetchGarageAdmins = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/Report/GetAllGarageAdmins`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const options = response.data.map((admin) => ({
          value: admin.AdminId, // Set adminId as the value
          label: `${admin.GarageId}`, // Format the label as needed
          name: admin.Name,
          garageName: admin.GarageName,
          garageId: admin.GarageId,
        }));
        setGarageAdmins(options);
      } catch (error) {
        console.error("Error fetching garage admins:", error);
      }
    };

    fetchGarageAdmins();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedGarageAdmin(selectedOption);
    onGarageAdminSelect(selectedOption);
  };

  return (
    <Select
      options={garageAdmins}
      value={selectedGarageAdmin}
      onChange={handleChange}
      placeholder="Select a garage by number"
      getOptionLabel={(option) => `${option.garageName} #${option.label}`} // Customize how the label is displayed
      styles={customStyles}
      components={{ Option: customRenderOption }}

      // classNames={{
      //   menu: (provided) => ({
      //     ...provided,
      //     className: "your-custom-menu-class", // Correctly specify the class name here
      //   }),
      // }}
      classNamePrefix="mySelect" // Add the custom class prefix here
    />
  );
};

const customRenderOption = (props) => {
  return (
    <components.Option {...props}>
      <div className="select-option">
        {props.data.garageName}
        <span>#{props.data.label}</span>
        </div>
    </components.Option>
  );
};

export default GarageAdminSelect;

