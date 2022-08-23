import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function TotalAndPeople(props) {
  return (
    <div>
      <h3>Total and people</h3>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>How much is the total cost?</Form.Label>
          <Form.Control required type="number" step="0.01" placeholder="XX.YY" name="total" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Who was involved today?</Form.Label>
          <Form.Control required type="text" placeholder="Jane, Jack, etc." name="people" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit total and people
        </Button>
      </Form>
    </div>
  );
}

export default TotalAndPeople;