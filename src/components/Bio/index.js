import React from 'react';
import { withFirebase } from '../Firebase';
import TextPage from '../TextPage'; 

const bio = props => (
    <TextPage firebase={props.firebase.bio}/>
)

export default withFirebase(bio);