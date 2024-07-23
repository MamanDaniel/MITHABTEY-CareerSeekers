import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

interface DonutChartProps {
    data: { labels: string[], counts: number[] };
    jobName: string; // New prop for job name
}

const PrerequisitesChart: React.FC<DonutChartProps> = ({ data, jobName }) => {
    const chartData = {
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
            }
        ]
    };

    const options = {
        plugins: {
            datalabels: {
                color: '#fff',
                font: {
                    weight: 700, 
                },
                formatter: (value: number) => {
                    // Don't show the label if the value is zero
                    if (value === 0) {
                        return null; 
                    }
                    return ` ${value}%`;
                },
            },
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
                display: true,
                position: 'bottom' as const
            },
            title: {
                display: true,
                text: `Character Traits for ${jobName}`,
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
