import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { jobFields } from './jobFieldMapping';

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
            const filteredData = {
                labels: data.labels.filter((_, index) => data.counts[index] !== 0),
                counts: data.counts.filter(count => count !== 0),
            };

            const hebrewLabels = filteredData.labels.map(label => jobFields[label]?.hebrew || label);

            const chartInstance = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: hebrewLabels,
                    datasets: [
                        {
                            data: filteredData.counts,
                            backgroundColor: 'rgba(50,127,167,0.6)',
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
                            text: 'ממוצע שכר עבור תחום',
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
                                return value === 0 ? null : new Intl.NumberFormat().format(value);
                            },
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'תחום מקצוע',
                                font: {
                                    weight: 'bold',
                                },
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'שכר ממוצע',
                                font: {
                                    weight: 'bold',
                                },
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

export default SalaryChart;
