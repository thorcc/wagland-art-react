import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.css';



const Nav = props => {
    return(
        <nav className={styles.Nav}>
            <ul>
                <li>
                    <NavLink exact={true} to="/" activeClassName={styles.active}>Art</NavLink>
                </li>
                <li>
                    <NavLink exact={true} to="/bio" activeClassName={styles.active}>Biography</NavLink>
                </li>
                <li>
                    <NavLink exact={true} to="/guest-book" activeClassName={styles.active}>Guest Book</NavLink>
                </li>
                <li>
                    <NavLink exact={true} to="/contact" activeClassName={styles.active}>Contact</NavLink>
                </li>
            </ul>

            {props.admin ? 
                <ul>
                    <li>
                        <NavLink exact={true} to="/admin/" activeClassName={styles.active}>Art</NavLink>
                    </li>
                    <li>
                        <NavLink exact={true} to="/admin/bio" activeClassName={styles.active}>Biography</NavLink>
                    </li>
                    <li>
                        <NavLink exact={true} to="/admin/guest-book" activeClassName={styles.active}>Guest Book</NavLink>
                    </li>
                    <li>
                        <NavLink exact={true} to="/admin/contact" activeClassName={styles.active}>Contact</NavLink>
                    </li> 
                </ul>: null}
        </nav>
    )
}

export default Nav;