import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Button, Container, Form, Row, Col, Alert} from 'react-bootstrap';

function Results(props) {
  // console.log(props);

  // Error warnings along the way
  var warnings = [
    [false, 'The subtotal was more than the total.'],
    [false, 'Some itemized transactions had no marked payers.'],
    [false, 'Some names were duplicated in the list of people.'],
    [false, 'The calculated total doesn\'t add up to the original total (internal calculation error).']
  ]

  // Calculate subtotal by person
  var subtotalArrayByPerson = new Array(props.peopleList.length);
  var subtotal = 0;
  const total = props.total;
  subtotalArrayByPerson.fill(0);
  for (let i = 0; i < props.spendingArray.length; i++) {
    let totalCostOfItem = props.spendingArray[i][0];
    // console.log(totalCostOfItem);
    subtotal += parseFloat(totalCostOfItem);
    let totalPeoplePayingItem = props.spendingArray[i].length - 1;
    if (totalPeoplePayingItem == 0) {
      warnings[1][0] = true;
    }
    let totalCostOfItemByPerson = totalCostOfItem / totalPeoplePayingItem;
    for (let j = 0; j < totalPeoplePayingItem; j++) {
      subtotalArrayByPerson[props.spendingArray[i][j+1]] += totalCostOfItemByPerson
    }
  }

  // Calculate percentages of subtotal by person
  var percentageArrayByPerson = new Array(props.peopleList.length);
  for (let i = 0; i < percentageArrayByPerson.length; i++) {
    percentageArrayByPerson[i] = subtotalArrayByPerson[i] / subtotal;
  }

  // Calculate totals by person
  var totalsByPerson = new Array(props.peopleList.length);

  // Generate text input string for debugging
  let textInput = '';
  textInput = textInput.concat(total, ' // ', props.peopleList.toString(), ' // ');
  for (let i = 0; i < props.spendingArray.length; i++) {
    textInput = textInput.concat(props.spendingArray[i][0])
    for (let j = 1; j < props.spendingArray[i].length; j++) {
      textInput = textInput.concat(' ', props.peopleList[props.spendingArray[i][j]]);
    }
    textInput = textInput.concat('; ');
  }

  textInput = textInput.substring(0,textInput.length-1)

  if (subtotal == total) {
    totalsByPerson = subtotalArrayByPerson;
  } else {
    for (let i = 0; i < totalsByPerson.length; i++) {
      totalsByPerson[i] = percentageArrayByPerson[i] * total;
    }
  }

  const calculatedTotal = totalsByPerson.reduce((a,b) => a + b, 0);
  if (roundToTwo(calculatedTotal) != roundToTwo(total)) {
    warnings[3][0] = true;
  }

  totalsByPerson = totalsByPerson.map((element, index) => {return '$' + element.toFixed(2)})
  
  // Warning for subtotal and total mistake
  if (roundToTwo(subtotal) > roundToTwo(total)) {
    warnings[0][0] = true;
  }
  // Warning for duplicate names
  if (hasDuplicates(props.peopleList)) {
    warnings[2][0] = true;
  }

  const TotalByPerson = props => <div>{props.person}: {props.total}</div>;
  const Warning = props => <div>{props.warningText}</div>

  return (
    <div>
      <Alert variant="primary">
        <h4>Results</h4>
        {totalsByPerson.map((totalByPerson, index) => <TotalByPerson key={index} person={props.peopleList[index]} total={totalByPerson} />)}
      </Alert>
      {warnings.map((warning, index) => {
        if (warning[0]) {
          return <Alert variant="danger"><Warning key={index} warningText={warning[1]} /></Alert>
        }
      })}
      <p>If you made a mistake, here is the text input that you can use to manually edit:</p>
      <p>{textInput}</p>
    </div>
  );
}

// Check if duplicates in array (from https://stackoverflow.com/a/7376645)
function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

// Round number to two decimals (from https://stackoverflow.com/a/11832950)
function roundToTwo(num) {
  return Math.round(num * 100) / 100
}

export default Results;
