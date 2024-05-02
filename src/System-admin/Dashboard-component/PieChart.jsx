import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export function PieChart({ data, options,colors }) {

  colors = colors || ["purple", "lightblue", "mediumorchid", "skyblue","grey"]; 

  const chartOptions = {
    ...options,
    colors: colors, // This line adds the colors to the options
    backgroundColor: 'transparent', // Use the variable here
    fontFamily: 'inherit',
    tooltip: { isHtml: true },

 };
 return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="100%"
      data={data}
      options={chartOptions}
    />
 );
}
