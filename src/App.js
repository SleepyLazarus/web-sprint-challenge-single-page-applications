import React from "react";
import { Button, Navbar, Card } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import OrderForm from './Form.js'

const App = () => {
  return (
    <>
    <Navbar color='blue'>
      <h1 style={{ color: 'white', margin: '0 auto' }}>Lambda Eats</h1>
      <Link to={'/'}>
        <Button color='blue'>
          Home
        </Button>
      </Link>
    </Navbar>
    <Route exact path='/'>
      <Card>
        <Link to={'./pizza'}>
          <Button color='info' style={{position: 'absolute', left: '50%', top: '50%'}}>
            Pizza
          </Button>
        </Link>
      </Card>
    </Route>
    
    <Route path='/pizza'>
      <OrderForm/>
    </Route>
    
    </>
  );
};
export default App;
