import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Button, Container, Form} from 'react-bootstrap';

function ItemizedSpending(props) {
  var temp = ['Jane', 'Jack', 'Joe']

  return (
    <div>
      <h3>Itemized spending</h3>
      <Form onSubmit={props.handleSubmit}>
        <Container>
          {props.itemList}
        </Container>
        <Button variant="secondary" onClick={props.addItem}>Add item</Button>
        <Button variant="primary" type="submit">
          Submit itemized spending
        </Button>
      </Form>
    </div>
  );
}

export default ItemizedSpending;
