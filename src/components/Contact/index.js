import React from 'react';
import TextPage from '../TextPage';
import { withFirebase } from '../Firebase';
import classes from './style.module.css';

const Contact = props => (
    <div className={classes.Container}>
        <TextPage firebase={props.firebase.contact}/>
    </div>
)

export default withFirebase(Contact); 