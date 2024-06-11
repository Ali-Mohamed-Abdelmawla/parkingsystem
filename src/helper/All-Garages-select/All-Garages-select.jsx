import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import "../Garage-admins-select.css";
import "../../System-admin/Styles/main.css";
import axiosInstance from "../../auth/axios";

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

const AllGaragesSelect = ({ onGarageSelect, role, defValue }) => {
  const [garageAdmins, setGarageAdmins] = useState([]);
  const [selectedGarageAdmin, setSelectedGarageAdmin] = useState(null);
  const [defaultOption, setDefaultOption] = useState(null);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    console.log("DefValue:", defValue);
    if (!accessToken) {
      return;
    }
    const fetchGarageAdmins = async () => {
      try {
        const response = await axiosInstance.get(
          `/TechnicalSupport/GetAllGarages`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const options = response.data.map((admin) => ({
          value: admin.GarageId, // Set adminId as the value
          label: `${admin.GarageId}`, // Format the label as needed
          garageName: admin.GarageName,
          garageId: admin.GarageId,
          garageHasAdmin: admin.HasAdmin,
        }));
        console.log("Role:", role);
        if (role === "garageadmin") {
          setGarageAdmins(options.filter((option) => !option.garageHasAdmin));
        } else {
          setGarageAdmins(options);
        }

        // Set default option if defValue is provided
        const defaultOpt = options.find(option => option.value === defValue);
        setDefaultOption(defaultOpt);
      } catch (error) {
        console.error("Error fetching garage admins:", error);
      }
    };

    fetchGarageAdmins();
  }, [role, defValue]);

  const handleChange = (selectedOption) => {
    setSelectedGarageAdmin(selectedOption);
    onGarageSelect(selectedOption);
  };

  return (
    <Select
      options={garageAdmins}
      value={selectedGarageAdmin ? selectedGarageAdmin : defaultOption}
      onChange={handleChange}
      placeholder="Select a garage by number"
      getOptionLabel={(option) => `${option.garageName} #${option.label}`} // Customize how the label is displayed
      styles={customStyles}
      components={{ Option: customRenderOption }}
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

export default AllGaragesSelect;
