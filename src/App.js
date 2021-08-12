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
import {COVID_API} from './api/covid19Api';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  const [mapCenter, setMapCenter] = useState({lat: -0.27489, lng: -78.4676});
  const [mapZoom, setMapZoom] = useState(5);
  const [tableVaccine, setTableVaccine] = useState([]);

  useEffect(() => {
    fetch(`${COVID_API.url}/all`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch(`${COVID_API.url}/countries`)
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
        `${COVID_API.url}/vaccine/coverage/countries?lastdays=1&fullData=true`
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
    const url =
      countryCode === 'worldwide'
        ? `${COVID_API.url}/all`
        : `${COVID_API.url}/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCountry(countryCode);
        setCountryInfo(data);
        countryCode === 'worldwide'
          ? setMapCenter({lat: -0.27489, lng: -78.4676})
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      });
  };

  return (
    <div className="app">
      <div className="appLeft">
        <div className="appHeader">
          <h1 className="header">COVID-19 Global Cases</h1>
          <Form.Control
            as="select"
            value={selectedCountry}
            onChange={onCountryChange}>
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
            active={casesType === 'cases'}
            caseType="cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format('0.0a')}
          />
          <InfoCard
            onClick={(e) => setCasesType('recovered')}
            title="Today Recovered"
            caseType="recovered"
            active={casesType === 'recovered'}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format('0.0a')}
          />
          <InfoCard
            onClick={(e) => setCasesType('deaths')}
            title="Today Deaths"
            caseType="deaths"
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
              <h3 className="lineChartName">
                Worldwide new {casesType} in last 4 months
              </h3>
              <LineChart title casesType={casesType} />
              <br />
              <h3 className="lineChartName">
                {selectedCountry === 'worldwide'
                  ? 'Vaccines rolled out in Ecuador (default select) in last 4 months'
                  : `Vaccines rolled out in ${selectedCountry} in last 4 months`}
              </h3>
              <LineChartVaccine
                selectedCountryCode={
                  selectedCountry === 'worldwide' ? 'EC' : selectedCountry
                }
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default App;
