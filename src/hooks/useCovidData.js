import { useState, useEffect } from 'react';
import { COVID_API } from '../api/covid19Api';
import { sortData, sortDataVaccine } from '../utils/util';

export const useCovidData = () => {
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableVaccine, setTableVaccine] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [globalRes, countriesRes, vaccineRes] = await Promise.all([
          fetch(`${COVID_API.url}/all`),
          fetch(`${COVID_API.url}/countries`),
          fetch(`${COVID_API.url}/vaccine/coverage/countries?lastdays=1&fullData=true`),
        ]);

        const globalData = await globalRes.json();
        const countriesData = await countriesRes.json();
        const vaccineData = await vaccineRes.json();

        setCountryInfo(globalData);

        const countriesList = countriesData.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        
        setCountries(countriesList);
        setMapCountries(countriesData);
        setTableData(sortData(countriesData));
        setTableVaccine(sortDataVaccine(vaccineData));
      } catch (error) {
        console.error('Error fetching initial covid data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  return {
    countryInfo,
    setCountryInfo,
    countries,
    mapCountries,
    tableData,
    tableVaccine,
    loading
  };
};
