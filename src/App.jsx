import { useState } from 'react';

import { Form } from 'react-bootstrap';
import numeral from 'numeral';
import 'leaflet/dist/leaflet.css';

import InfoCard from './components/InfoCard';
import LineChart from './components/LineChart';
import LineChartVaccine from './components/LineChartVaccine';
import CountryTable from './components/CountryTable';
import CountryVaccineTable from './components/CountryVaccineTable';
import CustomMapContainer from './components/CustomMapContainer';
import { prettyPrintStat } from './utils/util';
import { useCovidData } from './hooks/useCovidData';
import './App.css';
import { COVID_API } from './api/covid19Api';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState('worldwide');
  const {
    countryInfo,
    setCountryInfo,
    countries,
    mapCountries,
    tableData,
    tableVaccine,
    loading
  } = useCovidData();
  const [casesType, setCasesType] = useState('cases');
  const [mapCenter, setMapCenter] = useState({ lat: -0.27489, lng: -78.4676 });
  const [mapZoom, setMapZoom] = useState(7);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === 'worldwide'
        ? `${COVID_API.url}/all`
        : `${COVID_API.url}/countries/${countryCode}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      setSelectedCountry(countryCode);
      setCountryInfo(data);
      
      if (countryCode === 'worldwide') {
        setMapCenter({ lat: -0.27489, lng: -78.4676 });
      } else {
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      }
      setMapZoom(5);
    } catch (error) {
      console.error('Error fetching specific country data:', error);
    }
  };

  return (
    <div className="app">
      <div className="app-map-layer animate-entrance delay-4">
        <CustomMapContainer
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <div className="app-content-layer">
        <div className="appLeft">
          <div className="appHeader animate-entrance">
            <h1 className="header">COVID-19 Global Cases</h1>
            <Form.Control as="select" value={selectedCountry} onChange={onCountryChange}>
              <option value="worldwide">Worldwide</option>
              {countries.map((country, index) => (
                <option key={country.value || index} value={country.value}>
                  {country.name}
                </option>
              ))}
            </Form.Control>
          </div>
          <div className="appStats animate-entrance delay-1">
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
        </div>

        <div className="appRight animate-entrance delay-2">
          <div className="appInformation">
            <div className="appTables">
              <CountryTable title="Confirmed Cases by Country" countries={tableData} />
              <CountryVaccineTable
                title="Vaccines rolled out by Country"
                countries={tableVaccine}
              />
            </div>
            <div className="appChart animate-entrance delay-3">
              <h3 className="lineChartName">Worldwide new {casesType} in last 4 months</h3>
              <LineChart title casesType={casesType} />
              <br />
              <h3 className="lineChartName">
                {selectedCountry === 'worldwide'
                  ? 'Vaccines rolled out in Ecuador (default select) in last 4 months'
                  : `Vaccines rolled out in ${selectedCountry} in last 4 months`}
              </h3>
              <LineChartVaccine
                selectedCountryCode={selectedCountry === 'worldwide' ? 'EC' : selectedCountry}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
