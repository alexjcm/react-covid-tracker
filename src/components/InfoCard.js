import React from 'react';

import {Card} from 'react-bootstrap';

import './InfoCard.css';

function InfoCard({title, cases, total, active, caseType, ...props}) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoCard ${active && 'infoCard--selected'} 
      ${caseType === 'cases' && 'infoCard--cases'}
      ${caseType === 'recovered' && 'infoCard--recovered'}
      ${caseType === 'deaths' && 'infoCard--deaths'} `}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <h2
            className={`infoCardCases ${
              caseType === 'recovered' && 'infoCardCases--green'
            }`}>
            {cases}
          </h2>
        </Card.Text>
        <Card.Footer className="infoCardTotal">{total} Total</Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default InfoCard;
