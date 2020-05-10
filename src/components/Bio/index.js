import React from 'react';
import TextPage from '../TextPage';
import { withFirebase } from '../Firebase';

const Bio = props => (
    <div>
        <TextPage firebase={props.firebase.bio}/>
    </div>
)

export default withFirebase(Bio);