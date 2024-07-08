import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartData {
    labels: string[];
    counts: number[];
}

interface SalaryChartProps {
    data: ChartData;
}

const SalaryChart: React.FC<SalaryChartProps> = ({ data }) => {
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
                            backgroundColor: "rgba(244, 67, 54, 0.6)",
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: 'Average Salary by Job Field',
                            font: {
                                size: 15,
                            },
                        },
                    },
                },
            });

            return () => {
                chartInstance.destroy();
            };
        }
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default SalaryChart;
