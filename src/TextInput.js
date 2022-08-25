import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function TextInput(props) {
  return (
    <div>
      <h3>Text Input</h3>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Instead of using the form, feel free to input all the info directly:</Form.Label>
          <br/>
          <Form.Text className="text-muted">
            <p>
              Total as number (including tax and tip) // People as list // Itemized costs with costs then names (semicolon separated)
            </p>
            <p>
              123.45 // Jack Joe Jane // 50 Jack Joe; 40 Joe Jane; 30 Jane Jack
            </p>
          </Form.Text>
          <Form.Control required as="textarea" type="text" placeholder="TOTAL // PEOPLE // ITEMIZED COSTS" name="text-input" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Show me the split!
        </Button>
      </Form>
      <br/>
    </div>
  );
}

export default TextInput;
