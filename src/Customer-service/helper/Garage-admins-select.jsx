import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import './Garage-admins-select.css'
import '../../System-admin/Styles/main.css'
const baseURL = "https://raknaapi.azurewebsites.net";

const customStyles = {
  
  control: (styles, { isFocused }) => ({
      ...styles,
      background: 'var(--color-background)',
      color: 'var(--font-color) !important' ,
      display: 'flex',
      width: '100%',
      flexWrap: 'nowrap',
      borderColor: isFocused ? 'var(--special-color1)' : 'black',
      boxShadow: 'none',
      cursor: 'pointer',
      '&:hover': {
          backgroundColor: 'var(--hover-effect-color)',
          borderColor: 'black',
      },
  }),
  placeholder: (provided) => ({
      ...provided,
      fontSize: '17px',
      color: 'var(--font-color) !important' 
  }),
  dropdownIndicator: (provided) => ({
      ...provided,
      color: 'var(--special-color1)', // Change the color of the dropdown icon
  }),
  indicatorSeparator: (provided) => ({
      ...provided,
      color: 'var(--special-color1)', // Change the color of the indicator separator
  }),
  noOptionsMessage: (provided) => ({
      ...provided,
      color: 'var(--font-color)', // Change the color of the "No options" message
  }),
  menu: (provided) => ({
      ...provided,
      background: 'var(--secondary-color)',
  }),
  option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? 'var(--special-color1)' : isFocused ? 'var(--color-background) !important' : 'var(--secondary-color)',
      cursor: 'pointer',

  })
};
const GarageAdminSelect = ({ onGarageAdminSelect }) => {
  const [garageAdmins, setGarageAdmins] = useState([]);
  const [selectedGarageAdmin, setSelectedGarageAdmin] = useState(null);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    console.log(accessToken);
    const fetchGarageAdmins = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/Report/GetAllGarageAdmins`,
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
          garageId: admin.GarageId
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
      placeholder="Select a garage admin"
      getOptionLabel={(option) => `${option.label}`} // Customize how the label is displayed
      styles={customStyles}
    />
  );
};

export default GarageAdminSelect;
