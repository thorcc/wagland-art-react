import React from 'react';
import TextPage from '../TextPage';
import { withFirebase } from '../Firebase';
import classes from './style.module.css';

const Bio = props => (
    <div className={classes.Container}>
        <TextPage firebase={props.firebase.bio}/>
    </div>
)

export default withFirebase(Bio);