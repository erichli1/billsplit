import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Button, Container, Form} from 'react-bootstrap';

function ItemizedSpending(props) {
  var temp = ['Jane', 'Jack', 'Joe']

  return (
    <div>
      <h3>Itemized spending</h3>
      <p>Please click "Add item" to add a new line item</p>
      <Form onSubmit={props.handleSubmit}>
        <Container>
          {props.itemList}
        </Container>
        <Button variant="secondary" onClick={props.addItem}>Add item</Button>
        <Button variant="primary" type="submit" style={{marginLeft: 20 }}>
          Show me the split!
        </Button>
      </Form>
      <br/>
    </div>
  );
}

export default ItemizedSpending;
