import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useState} from 'react';

function App() {
  const [amount, setAmount] = useState();
  const [people, setPeople] = useState([]);

  var peopleList = [];

  const handleForm1Submit = event => {
    event.preventDefault();

    const peopleString = event.target.people.value;

    if (peopleString.includes(",")) {
      peopleList = peopleString.split(",");
    } else if (peopleString.includes(", ")) {
      peopleList = peopleString.split(", ");
    } else {
      peopleList = peopleString.split(" ");
    }

    setAmount(event.target.total.value);
    setPeople(peopleList);
  }

  const Input = () => {
    return <Form.Group className="mb-3"><Form.Control placeholder="Your input here" /></Form.Group>;
  };

  const [inputList, setInputList] = useState([]);

  const onAddBtnClick = event => {
    setInputList(inputList.concat(<Input key={inputList.length} />));
  };

  return (
    <div className="App">
      <div className="Main">
        <h1>Bill split</h1>
        {/* Form for total & names */}
        <Form onSubmit={handleForm1Submit}>
          <Form.Group className="mb-3">
            <Form.Label>How much is the total cost?</Form.Label>
            <Form.Control type="number" step="0.01" placeholder="XX.YY" name="total" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Who was involved today?</Form.Label>
            <Form.Control type="text" placeholder="Jane, Jack, etc." name="people" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit total and people
          </Button>
        </Form>

        <h4>Results</h4>
        <ul>
          <li>Amount: {amount}</li>
          <li>People: {people}</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
