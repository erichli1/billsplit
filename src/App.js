import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import TotalAndPeople from './TotalAndPeople';
import ItemizedSpending from './ItemizedSpending';
import Results from './Results';

import {useState} from 'react';
import {Form, Row, Col} from 'react-bootstrap';

function App() {
  const [amount, setAmount] = useState();
  const [form1Visible, setForm1Visible] = useState(true);
  const [form2Visible, setForm2Visible] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);
  const [spendingArray, setSpendingArray] = useState([]);

  const handleForm1Submit = event => {
    event.preventDefault();

    const peopleString = event.target.people.value;

    if (peopleString.includes(", ")) {
      setPeopleList(peopleString.split(", "));
    } else if (peopleString.includes(",")) {
      setPeopleList(peopleString.split(","));
    } else {
      setPeopleList(peopleString.split(" "));
    }

    setAmount(event.target.total.value);

    setForm1Visible(false);
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
    setItemList(itemList.concat(<Item key={itemList.length} />));
  }

  // const amountTest = 105;
  // const spendingArrayTest = [[30, 0, 1, 2],[30, 0, 1],[30,0]];
  // const peopleListTest = ['Jack', 'Jill', 'Jane'];
  
  return (
    <div className="App">
      <div className="Main">
        <h1>Bill split</h1>
        {form1Visible && <TotalAndPeople handleSubmit={handleForm1Submit}/>}
        {form2Visible && <ItemizedSpending handleSubmit={handleForm2Submit} itemList={itemList} addItem={addItem} />}
        {resultsVisible && <Results spendingArray={spendingArray} peopleList={peopleList} total={amount} />}
        {/* {resultsVisible && <Results spendingArray={spendingArrayTest} peopleList={peopleListTest} total={amountTest} />} */}
      </div>
    </div>
  );
}

export default App;
