import React from 'react';
import TextPage from '../TextPage';
import { withFirebase } from '../Firebase';

const Contact = props => (
    <div>
        <TextPage firebase={props.firebase.contact}/>
    </div>
)

export default withFirebase(Contact); 