
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export function BarChart({ data, options }) {
 return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
 );
}