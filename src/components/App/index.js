import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import styled from 'styled-components';

import AdminArt from '../Admin/Art';
import AdminBio from '../Admin/Bio';
import AdminContact from '../Admin/Contact';
import AdminGuestBook from '../Admin/GuestBook';
import Nav from '../Nav';

const Container = styled.div`
  margin-top: 100px;
`;

const App = () => {
    
    const [admin, setAdmin] = useState(true);

    return(
        <Router>
            <Nav admin={admin}/>
            <Container>
                <Switch>
                    <Route path="/admin/bio">
                        <AdminBio />
                    </Route>
                    <Route path="/admin/guest-book">
                        <AdminGuestBook />
                    </Route>
                    <Route path="/admin/contact">
                        <AdminContact />
                    </Route>
                    <Route path="/admin/">
                        <AdminArt />
                    </Route>
                </Switch>
            </Container>
        </Router>
  );
}

export default App;