import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface DataProps {
    categories: any;
    dataSeries: any;
}

export const SkillsGoal: React.FC<DataProps> = ({ categories, dataSeries }) => {
    const options = {
        chart: {
            id: "basic-bar",
        },
        colors: [
            '#068798',
        ],
        title: {
            text: "Distribuição de Independência (%)",
            style: {
                fontSize: "16px",
                fontWeight: "bold",
                color: "#333"
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 2,
                horizontal: true
            }
        },
        xaxis: {
            categories: categories,
            labels: {
                formatter: (value: any) => `${value}%`
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (value: any) => `${Math.floor(value)}%`,
            style: {
                fontSize: '12px',
                colors: ['#FFF']
            }
        },
        tooltip: {
            y: {
                formatter: (value: any) => `${value}%`
            }
        }
    };

    const series = [
        {
            name: "% de INDEPENDENTE",
            data: dataSeries
        },
    ];

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height="500"
            width="1000"
        />
    );
}