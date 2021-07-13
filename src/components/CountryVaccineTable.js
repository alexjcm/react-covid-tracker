import React from 'react';

import numeral from 'numeral';

import './CountryTable.css';

function CountryVaccineTable({title, countries}) {
  return (
    <div className="tableContainer">
      <h3 className="tableHeader">{title}</h3>
      <div className="table">
        {countries.map((country) => (
          <tr>
            <td>{country.country}</td>
            <td>
              <strong>{numeral(country.timeline[0].total).format('0,0')}</strong>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
}

export default CountryVaccineTable;
