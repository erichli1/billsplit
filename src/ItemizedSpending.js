import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Button, Container, Form} from 'react-bootstrap';

function ItemizedSpending(props) {
  var temp = ['Jane', 'Jack', 'Joe']

  return (
    <div>
      <h3>Itemized spending</h3>
      <p>Please click "Add item" to add a new line item. If with a large party, this might be easiest by inputting all the items and passing the phone around.</p>
      <ul>
        <li>
          Item is an optional name to help people differentiate between items.
        </li>
        <li>
          Item cost should include the cost of the item (no tax or tip).
        </li>
        <li>
          People should include all people who split the item.
        </li>
      </ul>
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
