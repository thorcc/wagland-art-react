import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { withFirebase } from '../Firebase';


import * as ROUTES from '../../constants/routes';

import styles from './style.module.css';
import SignOutButton from '../Admin/SignOutButton';

const Nav = props => {
    const [user, initialising, error] = useAuthState(props.firebase.auth);

    return( 
        <div>
            {user ? <NavAuth user={user}/> :<NavNonAuth />}
        </div>)
}

const NavNonAuth = props => {

    return(
        <nav className={styles.Nav}>
            <a className={styles.logo} href="./" class="logo">RW</a>
            <ul>
                <li>
                    <NavLink exact={true} to={ROUTES.LANDING} activeClassName={styles.active}>Art</NavLink>
                </li>
                <li>
                    <NavLink exact={true} to={ROUTES.BIO} activeClassName={styles.active}>Biography</NavLink>
                </li>
                <li>
                    <NavLink exact={true} to={ROUTES.GUEST_BOOK} activeClassName={styles.active}>Guest Book</NavLink>
                </li>
                <li>
                    <NavLink exact={true} to={ROUTES.CONTACT} activeClassName={styles.active}>Contact</NavLink>
                </li>
            </ul>
        </nav>
    )
}

const NavAuth = ({ user }) => (
    <nav className={styles.Nav}>
        <ul>
            <li>
                <NavLink exact={true} to={ROUTES.ADMINART} activeClassName={styles.active}>Art</NavLink>
            </li>
            <li>
                <NavLink exact={true} to={ROUTES.ADMINBIO} activeClassName={styles.active}>Biography</NavLink>
            </li>
            <li>
                <NavLink exact={true} to={ROUTES.ADMINGUESTBOOK} activeClassName={styles.active}>Guest Book</NavLink>
            </li>
            <li>
                <NavLink exact={true} to={ROUTES.ADMINCONTACT} activeClassName={styles.active}>Contact</NavLink>
            </li>
            <li className={styles.UserInfo}>
                <p>{user.email}</p>
                <SignOutButton />
            </li>
        </ul>
    </nav>
)
export default withFirebase(Nav);