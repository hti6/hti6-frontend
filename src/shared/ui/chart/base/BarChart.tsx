import { FC, useMemo } from "react";
import { ChartComponent, ChartProps } from "./Chart";
import { ChartData, ChartOptions } from "chart.js";

export interface BarChartProps extends ChartProps {
  data: ChartData<"bar">;
}

export const BarChart: FC<BarChartProps> = (props) => {
  const options = useMemo((): ChartOptions => {
    return {
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        y: {
          grid: {
            display: false,
          },
          stacked: true,
        },
        x: {
          grid: {
            display: false,
          },
          stacked: true,
        },
      },
    };
  }, []);

  return <ChartComponent type="bar" options={options} {...props} />;
};
