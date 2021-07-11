import React, {useState, useEffect} from 'react';

import {Form, Card} from 'react-bootstrap';
import numeral from 'numeral';
import 'leaflet/dist/leaflet.css';

import InfoCard from './components/InfoCard';
import LineChart from './components/LineChart';
import CountryTable from './components/CountryTable';
import MapContainer from './components/MapContainer';
import {sortData, prettyPrintStat} from './utils/util';
import './App.css';

const App = () => {
  const [country, setInputCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  console.log(casesType);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="appLeft">
        <div className="appHeader">
          <h1>COVID-19 Tracker</h1>
          <Form.Control as="select" value={country} onChange={onCountryChange}>
            <option value="worldwide">Worldwide</option>
            {countries.map((country) => (
              <option value={country.value}>{country.name}</option>
            ))}
          </Form.Control>
        </div>
        <div className="appStats">
          <InfoCard
            onClick={(e) => setCasesType('cases')}
            title="Coronavirus Cases"
            isRed
            active={casesType === 'cases'}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format('0.0a')}
          />
          <InfoCard
            onClick={(e) => setCasesType('recovered')}
            title="Recovered"
            active={casesType === 'recovered'}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format('0.0a')}
          />
          <InfoCard
            onClick={(e) => setCasesType('deaths')}
            title="Deaths"
            isRed
            active={casesType === 'deaths'}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format('0.0a')}
          />
        </div>
        <MapContainer
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card>
        <Card.Body>
          <div className="appInformation">
            <h3>Live Cases by Country</h3>
            <CountryTable countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineChart casesType={casesType} />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default App;