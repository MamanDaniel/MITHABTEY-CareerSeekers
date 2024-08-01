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

// Define colors for each job field
const colors: { [key: string]: string } = {
    'Business': 'rgba(117,169,255,0.6)',
    'Outdoor': 'rgba(208,129,222,0.6)',
    'Technology': 'rgba(148,223,215,0.6)',
    'General Culture': 'rgba(247,127,167,0.6)',
    'Science': 'rgba(255,206,86,0.6)',
    'Organization': 'rgba(75,192,192,0.6)',
    'Service': 'rgba(153,102,255,0.6)',
    'Arts And Entertainment': 'rgba(255,159,64,0.6)',
};

const JobsFieldCountChart: React.FC<JobFieldChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    console.log(data);
    useEffect(() => {
        if (chartRef.current) {
            const backgroundColors = data.labels.map(label => colors[label] || 'rgba(0,0,0,0.1)');

            const chartInstance = new Chart(chartRef.current, {
                type: 'pie',
                data: {
                    labels: data.labels,
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
