import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface JobsChartProps {
  data: { labels: string[], counts: number[] };
}

const JobsChart: React.FC<JobsChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: data.labels,
          datasets: [
            {
              data: data.counts,
              backgroundColor: [
                "rgba(117,169,255,0.6)", 
                "rgba(148,223,215,0.6)",
                "rgba(208,129,222,0.6)", 
                "rgba(247,127,167,0.6)",
                "rgba(255,206,86,0.6)",
                "rgba(75,192,192,0.6)",
                "rgba(153,102,255,0.6)",
                "rgba(255,159,64,0.6)",
                "rgba(103, 58, 183, 0.6))",
                "rgba(244, 67, 54, 0.6)",
                "rgba(263, 81, 181, 0.6)",
                "rgba(63, 81, 181, 0.6)",
                "rgba(100, 81, 181, 0.6)",
                "rgba(0, 150, 99, 0.6)",
                "rgba(0, 150, 212, 0.6)"
              ],
            },
          ],
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default JobsChart;

