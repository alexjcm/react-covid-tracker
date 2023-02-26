import React, { useState, useEffect } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

import './LineChart.css';
import { COVID_API } from '../api/covid19Api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
  title: {
    display: false,
  },
};

const buildChartData = (data) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.timeline) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data['timeline'][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data['timeline'][date];
  }
  return chartData;
};

function LineChartVaccine({ selectedCountryCode }) {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${COVID_API.url}/vaccine/coverage/countries/${selectedCountryCode}?lastdays=120`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data);
          setData(chartData);
        });
    };
    fetchData();
  }, [selectedCountryCode]);

  const allData = {
    datasets: [
      {
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        fill: true,
        data: data,
      },
    ],
  };

  return (
    <div>
      {data?.length > 0 && (
        <Line className="lineChart" data={allData} options={options}
        />
      )}
    </div>
  );
}

export default LineChartVaccine;
