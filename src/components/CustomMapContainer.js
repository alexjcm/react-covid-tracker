import React from 'react';

import { Map, TileLayer } from 'react-leaflet';

import { showDataOnMap } from './CustomPopup';
import './CustomMapContainer.css';

function CustomMapContainer({ countries, casesType, center, zoom }) {
  return (
    <div className="mapContainer">
      <Map center={center} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </Map>
    </div>
  );
}

export default CustomMapContainer;
