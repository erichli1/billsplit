import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Button, Container, Form, Row, Col} from 'react-bootstrap';

function Results(props) {
  // console.log(props);

  // Error warnings along the way
  var warnings = [
    [false, 'The subtotal was more than the total.'],
    // [false, 'Some itemized transactions had no marked payers.'],
    // [false, 'Some names were duplicated in the list.'],
    // [false, 'The calculated total doesn\'t add up to the original total.']
  ]

  // Calculate subtotal by person
  var subtotalArrayByPerson = new Array(props.peopleList.length);
  var subtotal = 0;
  const total = props.total;
  subtotalArrayByPerson.fill(0);
  for (let i = 0; i < props.spendingArray.length; i++) {
    let totalCostOfItem = props.spendingArray[i][0];
    console.log(totalCostOfItem);
    subtotal += parseFloat(totalCostOfItem);
    let totalPeoplePayingItem = props.spendingArray[i].length - 1;
    let totalCostOfItemByPerson = totalCostOfItem / totalPeoplePayingItem;
    for (let j = 0; j < totalPeoplePayingItem; j++) {
      subtotalArrayByPerson[props.spendingArray[i][j+1]] += totalCostOfItemByPerson
    }
  }

  // console.log('SUBTOTAL');
  // console.log(subtotal);
  // console.log(subtotalArrayByPerson);

  // Calculate percentages of subtotal by person
  var percentageArrayByPerson = new Array(props.peopleList.length);
  for (let i = 0; i < percentageArrayByPerson.length; i++) {
    percentageArrayByPerson[i] = subtotalArrayByPerson[i] / subtotal;
  }

  // console.log('PERCENTAGES');
  // console.log(percentageArrayByPerson);

  // Calculate totals by person
  var totalsByPerson = new Array(props.peopleList.length);

  if (subtotal == total) {
    totalsByPerson = subtotalArrayByPerson
  } else {
    for (let i = 0; i < totalsByPerson.length; i++) {
      totalsByPerson[i] = percentageArrayByPerson[i] * total;
    }
  }

  // console.log('TOTALS');
  // console.log(totalsByPerson);

  // Warning for subtotal and total mistake
  if (subtotal > total) {
    warnings[1][0] = true;
  }

  const TotalByPerson = props => <div>{props.person}: {props.total}</div>;
  const Warning = props => <div>{props.warningText}</div>

  return (
    <div>
      <h4>Results</h4>
      {totalsByPerson.map((totalByPerson, index) => <TotalByPerson key={index} person={props.peopleList[index]} total={totalByPerson} />)}
      {warnings.map((warning, index) => {
        if (warning[0]) {
          return <Warning key={index} warningText={warning[1]} />
        }
      })}
    </div>
  );
}

export default Results;
