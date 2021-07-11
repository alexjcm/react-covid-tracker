import React from 'react';

import {Card} from 'react-bootstrap';

import './InfoCard.css';

function InfoCard({title, cases, total, active, isRed, ...props}) {
  //console.log(title, active);
  return (
    <Card
      onClick={props.onClick}
      className={`infoCard ${active && 'infoCard--selected'} ${
        isRed && 'infoCard--red'
      }`}>
      <Card.Body>
        <Card.Title color="textSecondary">{title}</Card.Title>
        <Card.Text>
          <h2 className={`infoCardCases ${!isRed && 'infoCardCases--green'}`}>
            {cases}
          </h2>
        </Card.Text>
        <Card.Footer className="infoCardTotal" color="textSecondary">
          {total} Total
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default InfoCard;