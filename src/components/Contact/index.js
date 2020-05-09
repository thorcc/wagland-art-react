import React from 'react';
import { withFirebase } from '../Firebase';
import TextPage from '../TextPage'; 

const contact = props => (
    <TextPage firebase={props.firebase.contact}/>
)

export default withFirebase(contact);