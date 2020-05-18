import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { withFirebase } from '../Firebase';


import * as ROUTES from '../../constants/routes';

import styles from './style.module.css';
import SignOutButton from '../Admin/SignOutButton';
import classes from './style.module.css';

const Burger = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 18 18"><path fill="white" d="M2 13.5h14V12H2v1.5zm0-4h14V8H2v1.5zM2 4v1.5h14V4H2z"/></svg>;

const Nav = props => {
    const [user, initialising, error] = useAuthState(props.firebase.auth);

    return( 
        <div>
            {user ? <NavAuth user={user}/> :<NavNonAuth />}
        </div>)
}

const NavNonAuth = props => {
    const [open, setOpen] = useState(false);


    return(
        <nav className={styles.Nav}>
            <div className={styles.LogoBurger}>
                <a className={styles.logo} href="./">RW</a>
                <button className={classes.Burger} onClick={() => setOpen(!open)}>
                    <Burger />
                </button>
            </div>
            <ul onClick={() => setOpen(false)} className={open ? classes.OpenNav: classes.ClosedNav}>
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

const NavAuth = ({ user }) => {
    const [open, setOpen] = useState(false);

    return(
        <nav className={styles.Nav}>
            <div className={styles.LogoBurger}>
                <a className={styles.logo} href="./">RW</a>
                <button className={classes.Burger} onClick={() => setOpen(!open)}>
                    <Burger />
                </button>
            </div>
            <ul onClick={() => setOpen(false)} className={open ? classes.OpenNav: classes.ClosedNav}>
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
}
export default withFirebase(Nav);