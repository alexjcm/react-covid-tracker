import React from 'react';

import numeral from 'numeral';

import './CountryTable.css';

function CountryTable({countries}) {
  return (
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
  );
}

export default CountryTable;
