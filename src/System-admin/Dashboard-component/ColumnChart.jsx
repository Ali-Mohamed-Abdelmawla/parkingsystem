// ChartComponent.js
import React from "react";
import { Chart } from "react-google-charts";
 
export function ColumnChart({ data, options }) {
 return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
 );
}