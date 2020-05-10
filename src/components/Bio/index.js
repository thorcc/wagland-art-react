import React from 'react';
import TextPage from '../TextPage';
import { withFirebase } from '../Firebase';
import classes from './style.module.css';
import portrait from '../../images/portrait.jpg'

const Bio = props => (
    <div className={classes.Container}>
        <img className={classes.Portrait} src={portrait} />
        <TextPage firebase={props.firebase.bio}/>
    </div>
)

export default withFirebase(Bio);