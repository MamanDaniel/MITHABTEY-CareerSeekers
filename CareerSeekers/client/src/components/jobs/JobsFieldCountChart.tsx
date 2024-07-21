import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface ChartData {
    labels: string[];
    counts: number[];
}

interface JobFieldChartProps {
    data: ChartData;
}

const JobsFieldCountChart: React.FC<JobFieldChartProps> = ({ data }) => {
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
                            ],
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Amount of jobs by field',
                            font: {
                                size: 15,
                            },
                        },
                        datalabels: {
                            color: '#fff',
                            font: {
                                weight: 'bold',
                            },
                            formatter: (value: number) => {
                                return value === 0 ? null : `${value}`;
                            },
                        },
                    },
                },
                plugins: [ChartDataLabels],
            });

            return () => {
                chartInstance.destroy();
            };
        }
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default JobsFieldCountChart;
