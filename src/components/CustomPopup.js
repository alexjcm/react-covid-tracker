import React from 'react';

import numeral from 'numeral';
import {Circle, Popup} from 'react-leaflet';

import "./CustomPopup.css"

// rojo
// verde
// naranja
const casesTypeColors = {
  cases: {
    hex: '#0000FF',
    multiplier: 400,
  },
  recovered: {
    hex: '#008000',
    multiplier: 600,
  },
  deaths: {
    hex: '#CC1034',
    multiplier: 1000,
  },
};

export const showDataOnMap = (data, casesType = 'cases') =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.2}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
      stroke={false}
      >
      <Popup>
        <div className="infoContainer">
          <div className="infoName">{country.country}</div>
          <div
            className="infoFlag"
            style={{backgroundImage: `url(${country.countryInfo.flag})`}}></div>
          <div className="infoConfirmed">
            Cases: {numeral(country.cases).format('0,0')}
          </div>
          <div className="infoRecovered">
            Recovered: {numeral(country.recovered).format('0,0')}
          </div>
          <div className="infoDeaths">
            Deaths: {numeral(country.deaths).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ));