import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface DonutChartProps {
    data: { labels: string[], counts: number[] };
}

const PrerequisitesChart: React.FC<DonutChartProps> = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.counts,
                backgroundColor: [
                    '#FF6384', // Red
                    '#36A2EB', // Blue
                    '#FFCE56', // Yellow
                    '#FF9F40', // Orange
                    '#4BC0C0', // Teal
                    '#9966FF', // Purple
                    '#C9CBCF', // Light Grey
                    '#524e4b'  // Bright Red-Orange
                ],
            }
        ]
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        let label = context.label || '';
                        if (label) {
                            const count = context.raw;
                            return `${label}: ${count}%`;
                        }
                        return '';
                    }
                }
            },
            legend: {
                display: true, // This will remove the labels above the chart
                position: 'left' as const
            },
            title: {
                display: true,
                text: 'Character Traits for the Job',
                font: {
                    size: 15
                }
            }
        }
    };

    return (
        <div>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default PrerequisitesChart;
