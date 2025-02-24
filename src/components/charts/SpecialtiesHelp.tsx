import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface DataProps {
    categories: any;
    dataSeries: any;
}
export const SpecialtiesHelp: React.FC<DataProps> = ({ categories,  dataSeries}) => {
    const options = {
        chart: {
            id: "basic-bar",
            stackType: '100%' as const
        },
        colors: [
            '#00cc00',
            '#ff751a',
            '#ff33cc',
            '#9933ff',
            '#2eb8b8',
            '#3399ff',
            '#ff0000',

        ],
        plotOptions: {
            bar: {
                borderRadius: 2
            }
        },
        xaxis: {
            categories: categories
        },
        yaxis: {
           show: false,
        }
    };

    const series = dataSeries;

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height="200"
            width="1000"
        />
    );

};