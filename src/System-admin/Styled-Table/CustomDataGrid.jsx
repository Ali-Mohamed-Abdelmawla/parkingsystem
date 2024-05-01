import "./Datagrid.css";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
// import { arSD } from "@mui/x-data-grid/locales"; // TO change the language if needed
import PropTypes from "prop-types";
import "./Datagrid.css";
import "../Styles/main.css";

const StyledDataGrid = styled(DataGrid)({
  width: "100% !important", // Adjust the width
  borderRadius: "var(--card-border-radius)",
  fontSize: "14px",
  color: "var(--font-color)",
  minHeight: "200px", 
  "& .MuiDataGrid-columnHeader": {
    transition: "all 0.3s ease",
    backgroundColor: "var(--special-color1)", // Change the header background color
    fontWeight: "bolder !important",
    outline: "none !important",
  },
  "& .MuiDataGrid-sortIcon": {
    color: "var(--secondary-color) !important", // Change the sort icon color
  },
  "& .MuiDataGrid-cell": {
    transition: "all 0.3s ease",
    outline: "none !important",
    backgroundColor: "var(--table-color)", // Change the table color
  }
});

const CustomDataGrid = ({
  rows,
  columns,
  getRowId,
  initialState,
  pageSizeOptions,
  checkboxSelection,
  onRowSelectionModelChange,
}) => {
  CustomDataGrid.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    getRowId: PropTypes.func.isRequired,
    initialState: PropTypes.object.isRequired,
    pageSizeOptions: PropTypes.array.isRequired,
  };

  return (
    <StyledDataGrid
      rows={rows}
      columns={columns}
      getRowId={getRowId}
    //   localeText={arSD.components.MuiDataGrid.defaultProps.localeText} // Pass the Arabic locale
      initialState={initialState}
      pageSizeOptions={pageSizeOptions}
      checkboxSelection={checkboxSelection} // Use the prop to control checkbox selection
      onRowSelectionModelChange={onRowSelectionModelChange}

      // Add other props as needed
    />
  );
};

export default CustomDataGrid;
