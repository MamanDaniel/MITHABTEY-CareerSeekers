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
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
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
                            return `${label}: ${count} ${'%'}`;
                        }
                        return '';
                    }
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
