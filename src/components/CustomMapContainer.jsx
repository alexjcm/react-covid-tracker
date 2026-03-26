

import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

import { showDataOnMap } from './CustomPopup';
import './CustomMapContainer.css';

function CustomMapContainer({ countries, casesType, center, zoom }) {
  return (
    <div className="mapContainer">
      <MapContainer zoomControl={false} center={center} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default CustomMapContainer;
