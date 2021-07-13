import React, {useState, useEffect} from 'react';

import {Form, Card} from 'react-bootstrap';
import numeral from 'numeral';
import 'leaflet/dist/leaflet.css';

import InfoCard from './components/InfoCard';
import LineChart from './components/LineChart';
import LineChartVaccine from './components/LineChartVaccine';
import CountryTable from './components/CountryTable';
import CountryVaccineTable from './components/CountryVaccineTable';
import MapContainer from './components/MapContainer';
import {sortData, sortDataVaccine, prettyPrintStat} from './utils/util';
import './App.css';

const App = () => {
  const [country, setInputCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  const [mapCenter, setMapCenter] = useState({lat: -0.27489, lng: -78.4676});
  const [mapZoom, setMapZoom] = useState(5);
  const [tableVaccine, setTableVaccine] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('EC');

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

  useEffect(() => {
    const getCountriesData = async () => {
      fetch(
        'https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1&fullData=true'
      )
        .then((response) => response.json())
        .then((data) => {
          let sortedDataV = sortDataVaccine(data);
          setTableVaccine(sortedDataV);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    console.log("countryCode", countryCode)
    setSelectedCountryCode(countryCode);
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
        setMapZoom(5);
      });
  };

  return (
    <div className="app">
      <div className="appLeft">
        <div className="appHeader">
          <h1 className="header">COVID-19 Global Cases</h1>
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
            title="Today Confirmed Cases"
            isRed
            active={casesType === 'cases'}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format('0.0a')}
          />
          <InfoCard
            onClick={(e) => setCasesType('recovered')}
            title="Today Recovered"
            active={casesType === 'recovered'}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format('0.0a')}
          />
          <InfoCard
            onClick={(e) => setCasesType('deaths')}
            title="Today Deaths"
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
            <div className="appTables">
              <CountryTable
                title="Confirmed Cases by Country"
                countries={tableData}
              />
              <CountryVaccineTable
                title="Vaccines rolled out by Country"
                countries={tableVaccine}
              />
            </div>
            <div className="appChart">
              <h3>Worldwide new {casesType} in last 120 days</h3>
              <LineChart title casesType={casesType} />
              <br />
              <h3>Vaccines rolled out by selected country in last 120 days</h3>
              <LineChartVaccine                
                selectedCountryCode={selectedCountryCode}            
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default App;
