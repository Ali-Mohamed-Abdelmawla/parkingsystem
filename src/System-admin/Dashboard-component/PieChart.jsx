import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export function PieChart({ data, options }) {
 return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
 );
}
