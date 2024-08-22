import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface RadialGaugeChartProps {
    value: number;
}
const RadialProcedure: React.FC<RadialGaugeChartProps> = ({ value }) => {
    const options = {
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    show: true,
                    name: {
                        show: false,
                        color: undefined,
                        offsetY: 120
                    },
                    value: {
                        offsetY: 45,
                        fontSize: '18px',
                        color: undefined,
                        formatter: function (val: any) {
                            return val + "%";
                        }
                    }
                }
            },
            fill: {
                type: 'solid',
            },
            stroke: {
                lineCap: 'round',
            },
            labels: ['Nível'],
        }
    };

    const series = [value];

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="radialBar"
            height="100"
        />
    );

};

export default RadialProcedure;