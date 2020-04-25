import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import styled from 'styled-components';

import Art from '../Art';
import Bio from '../Bio';
import Contact from '../Contact';
import GuestBook from '../GuestBook';
import Nav from '../Nav';

const Container = styled.div`
  margin-top: 100px;
`;

const App = () => {
    

    return(
        <Router>
                <Nav />

            <Container>
                <Switch>
                    <Route path="/bio">
                        <Bio />
                    </Route>
                    <Route path="/guest-book">
                        <GuestBook />
                    </Route>
                    <Route path="/contact">
                        <Contact />
                    </Route>
                    <Route path="/">
                        <Art />
                    </Route>
                </Switch>
            </Container>
        </Router>
  );
}

export default App;