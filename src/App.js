import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import TotalAndPeople from './TotalAndPeople';
import ItemizedSpending from './ItemizedSpending';
import Results from './Results';
import TextInput from './TextInput';

import {useState} from 'react';
import {Form, Row, Col} from 'react-bootstrap';

function App() {
  const [amount, setAmount] = useState();
  const [form1Visible, setForm1Visible] = useState(true);
  const [form2Visible, setForm2Visible] = useState(false);
  const [textInputVisible, setTextInputVisible] = useState(true);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);
  const [spendingArray, setSpendingArray] = useState([]);

  const handleForm1Submit = event => {
    event.preventDefault();

    const peopleString = event.target.people.value;

    setPeopleList(splitStringBySpacesOrCommas(peopleString).sort());

    setAmount(event.target.total.value);

    setForm1Visible(false);
    setTextInputVisible(false);
    setForm2Visible(true);
  }

  const handleForm2Submit = event => {
    event.preventDefault();

    for(let i = 0; i < itemList.length; i++) {
      let tempArray = new Array();
      tempArray.push(event.target['item-' + i].value);
      for(let j = 0; j < peopleList.length; j++) {
        if(event.target['item-' + i + '-' + peopleList[j]].checked) {
          tempArray.push(j);
        }
      }

      setSpendingArray(spendingArray => [...spendingArray, tempArray]);
    }

    setForm2Visible(false);
    setTextInputVisible(true);
    setResultsVisible(true);
  }

  const Item = () => {
    return <Row>
      <Col><Form.Control required type="number" step="0.01" placeholder="XX.YY" name={'item-' + itemList.length} /></Col>
      <Col>
        {peopleList.map((name) => (
          <Form.Check label={name} id={'item-' + itemList.length + '-' + name} key={'item-' + itemList.length + '-' + name} name={'item-' + itemList.length + '-' + name}/>
        ))}
      </Col>
    </Row>
  }

  const addItem = event => {
    setItemList(itemList.concat(<div key={itemList.length}><Item /><hr/></div>));
  }

  const handleTextInputSubmit = event => {
    event.preventDefault();

    const textInput = event.target['text-input'].value;

    let textInputSubstrings = textInput.split('//');
    textInputSubstrings = trimStringArray(textInputSubstrings);

    setAmount(parseFloat(textInputSubstrings[0]));
    const localPeopleList = splitStringBySpacesOrCommas(textInputSubstrings[1]).sort()
    setPeopleList(localPeopleList);

    let localItemizedCostsString = textInputSubstrings[2];
    if (localItemizedCostsString[localItemizedCostsString.length - 1] == ';') {
      localItemizedCostsString = localItemizedCostsString.substring(0,localItemizedCostsString.length-1);
    }

    const rawItemizedCosts = trimStringArray(localItemizedCostsString.split(";"));
    let convertedItemizedCosts = rawItemizedCosts.map((item) => {
      return splitStringBySpacesOrCommas(item);
    })
    for (let i = 0; i < convertedItemizedCosts.length; i++) {
      for (let j = 1; j < convertedItemizedCosts[i].length; j++) {
        convertedItemizedCosts[i][j] = localPeopleList.indexOf(convertedItemizedCosts[i][j]);
      }
    }
    
    setSpendingArray(convertedItemizedCosts);
    setForm1Visible(false);
    setResultsVisible(true);
  }
  
  return (
    <div className="App">
      <div className="Main">
        <h1>Bill split</h1>
        <p>
          This is a bill splitting app made by <a href="https://erichli.com" target="_blank">Eric Li</a> with source code on <a href="https://github.com/erichli1/billsplit" target="_blank">GitHub</a>.
        </p>
        <p>
          I'm guessing I'll be 95% of the user activity, but if you're not me, then welcome!
          I made this website to make it easy to split costs based on percentage of subtotal (rather than percentage of total).
          This makes it easy to do itemized splitting where different people share different items, letting us split tax/tip evenly.
        </p>
        {form1Visible && <TotalAndPeople handleSubmit={handleForm1Submit}/>}
        {form2Visible && <ItemizedSpending handleSubmit={handleForm2Submit} itemList={itemList} addItem={addItem} />}
        {textInputVisible && <TextInput handleSubmit={handleTextInputSubmit} />}
        {resultsVisible && <Results spendingArray={spendingArray} peopleList={peopleList} total={amount} />}
        {/* {resultsVisible && <Results spendingArray={spendingArrayTest} peopleList={peopleListTest} total={amountTest} />} */}
      </div>
    </div>
  );
}

function trimStringArray(arr) {
  return arr.map((string) => {return string.trim()});
}

function splitStringBySpacesOrCommas(string) {
  if (string.includes(", ")) {
    return string.split(", ");
  } else if (string.includes(",")) {
    return string.split(",");
  } else {
    return string.split(" ");
  }
}

export default App;
