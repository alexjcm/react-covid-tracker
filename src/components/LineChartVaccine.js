import React, {useState, useEffect} from 'react';

import {Line} from 'react-chartjs-2';
import numeral from 'numeral';

import "./LineChart.css"

const options = {
  plugins: {
    legend: {
      display: false
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
    xAxes: [
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
        y: data["timeline"][date] - lastDataPoint,
      };      
      chartData.push(newDataPoint);
    }
    lastDataPoint = data["timeline"][date];
  }
  return chartData;
};

function LineChartVaccine({selectedCountryCode}) {
  const [data, setData] = useState({}); 
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${selectedCountryCode}?lastdays=120`)
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

  return (
    <div>
      {data?.length > 0 && (
        <Line className="lineChart"  
          data={{
            datasets: [
              {         
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                fill: true,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineChartVaccine;
