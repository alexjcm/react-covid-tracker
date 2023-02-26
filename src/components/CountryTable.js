import React from 'react';

import numeral from 'numeral';

import './CountryTable.css';

function CountryTable({ title, countries }) {
  return (
    <div className="tableContainer">
      <h3 className="tableHeader">{title}</h3>
      <div className="table">
        {countries.map((country) => (
          <tr>
            <td>{country.country}</td>
            <td>
              <strong>{numeral(country.cases).format('0,0')}</strong>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
}

export default CountryTable;
