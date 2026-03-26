

import numeral from 'numeral';

import './CountryTable.css';

function CountryVaccineTable({ title, countries }) {
  return (
    <div className="tableContainer">
      <h3 className="tableHeader">{title}</h3>
      <table className="table">
        <tbody>
          {countries.map((country, index) => (
            <tr key={country.country || index}>
              <td>{country.country}</td>
              <td>
                <strong>{numeral(country.timeline[0].total).format('0,0')}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CountryVaccineTable;
