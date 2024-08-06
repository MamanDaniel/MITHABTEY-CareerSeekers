import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { jobFields } from './jobFieldMapping';

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
            const backgroundColors = data.labels.map(label => jobFields[label]?.color || 'rgba(0,0,0,0.1)');
            const hebrewLabels = data.labels.map(label => jobFields[label]?.hebrew || label);

            const chartInstance = new Chart(chartRef.current, {
                type: 'pie',
                data: {
                    labels: hebrewLabels,
                    datasets: [
                        {
                            data: data.counts,
                            backgroundColor: backgroundColors,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: 'כמות מקצועות בכל תחום',
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
