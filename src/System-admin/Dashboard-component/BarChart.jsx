
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export function BarChart({ data, options, colors  }) {

  const chartOptions = {
    ...options,
    colors: colors, // This line adds the colors to the options
 };

 return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="100%"
      data={data}
      options={chartOptions}
    />
 );
}

