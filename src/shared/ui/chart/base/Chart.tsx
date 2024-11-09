import { FC, ReactNode, useEffect, useMemo, useRef } from "react";

import { Chart, TooltipItem, TooltipModel } from "chart.js";
import { type ChartData, type ChartOptions, type ChartType } from "chart.js";

export interface ChartComponentProps {
  type: ChartType;
  data: ChartData;
  defaultTooltip?: boolean;
  options?: ChartOptions;
  tooltip?: ReactNode;
  onTooltip?: (model: any) => void;
  onLabel?: (
    this: TooltipModel<ChartType>,
    tooltipItem: TooltipItem<ChartType>,
  ) => void;
}

export interface ChartProps extends Omit<ChartComponentProps, "type"> { }

export const ChartComponent: FC<ChartComponentProps> = (props) => {
  const {
    type,
    data,
    options,
    defaultTooltip = true,
    tooltip,
    onTooltip,
    onLabel,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart | null>(null);

  const defaultOptions = useMemo((): ChartOptions => {
    return {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: defaultTooltip,
          mode: "index",
          intersect: false,
          external: defaultTooltip ? () => null : onTooltip,
          callbacks: {
            label: onLabel,
          },
        },
      },
      ...options,
    };
  }, [defaultTooltip, options, onLabel, onTooltip]);

  const createChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (chart.current) chart.current.destroy();

    chart.current = new Chart(ctx, {
      type,
      data,
      options: defaultOptions,
    });
  };

  const updateChart = () => {
    if (!chart.current) return;
    chart.current.data.datasets = data.datasets;
    chart.current.data.labels = data.labels;
    if (options) chart.current.options = options;

    chart.current.update();
  };

  useEffect(() => {
    if (data) {
      if (!chart.current) createChart();
      else updateChart();
    }
  }, [data]);

  return (
    <>
      <canvas ref={canvasRef} />
      {tooltip && <>{tooltip}</>}
    </>
  );
};
