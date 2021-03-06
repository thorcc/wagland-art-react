import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import styled from 'styled-components';

import Art from '../Art';
import Bio from '../Bio';
import GuestBook from '../GuestBook';
import Contact from '../Contact';
import AdminArt from '../Admin/Art';
import AdminBio from '../Admin/Bio';
import AdminContact from '../Admin/Contact';
import AdminGuestBook from '../Admin/GuestBook';
import Nav from '../Nav';
import SignIn from '../Admin/SignIn'
import SignOut from '../Admin/SignOutButton';

const Container = styled.div`
  margin-top: 100px;
`;

const App = props => {
    const [user, initialising, error] = useAuthState(props.firebase.auth);

    return(
        <Router>
            <Nav />
            <Container>
              <h1 className="title">ROGER WAGLAND</h1>
                <Switch>
                    <Route exact path={ROUTES.LANDING} component={Art} />
                    <Route path={ROUTES.BIO} component={Bio} />
                    <Route path={ROUTES.GUEST_BOOK} component={GuestBook} />
                    <Route path={ROUTES.CONTACT} component={Contact} />
                    <Route exact path={ROUTES.ADMINLANDING} component={SignIn} />
                    {user && (
                      <Route path={ROUTES.ADMINART} component={AdminArt} />
                    )}
                    {user && (
                    <Route path={ROUTES.ADMINBIO} component={AdminBio} />
                    )}
                    {user && (
                    <Route path={ROUTES.ADMINGUESTBOOK} component={GuestBook} />
                    )}
                    {user && (
                    <Route path={ROUTES.ADMINCONTACT} component={AdminContact} />
                    )}
                </Switch>
            </Container>
        </Router>
  );
}

export default withFirebase(App);