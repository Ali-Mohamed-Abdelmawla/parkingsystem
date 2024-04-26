import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import './Garage-admins-select.css'

const baseURL = "https://raknaapi.azurewebsites.net";
const accessToken = sessionStorage.getItem("accessToken");

const GarageAdminSelect = ({ onGarageAdminSelect }) => {
  const [garageAdmins, setGarageAdmins] = useState([]);
  const [selectedGarageAdmin, setSelectedGarageAdmin] = useState(null);

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
    />
  );
};

export default GarageAdminSelect;
