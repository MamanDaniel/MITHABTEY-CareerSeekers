import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartData {
    labels: string[];
    counts: number[];
}

interface PrerequisitesChartProps {
    data: ChartData;
}

const PrerequisitesChart: React.FC<PrerequisitesChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            data: data.counts,
                            backgroundColor: "rgba(103, 58, 183, 0.6)",
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

export default PrerequisitesChart;
