import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './Components/NavBar';
import PizzaForm from './Components/PizzaForm';
import HomePage from './Components/HomePage';
import styled from 'styled-components';

const App = () => {
  const [orders, setOrders] = useState([]);

  const addOrder = order => {
    setOrders([...orders, order]);
  }
  return (
      <AppContainer>
        <NavBar />
        <Switch>
          <Route path='/buildapizza'>
            <PizzaForm addOrder={addOrder} />
          </Route>
          <Route exact path = '/'>
            <HomePage orders={orders} />
          </Route>
        </Switch>
      </AppContainer>
  );
};

const AppContainer = styled.div`
  background: ghostwhite;
`

export default App;
