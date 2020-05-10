import React, { useState } from 'react';
import { withFirebase } from '../../Firebase';

const SignIn = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            const user = await props.firebase.doSignInWithEmailAndPassword(email, password);
            console.log(user);
            setEmail('');
            setPassword('');
        }
        catch(err){
            setError(err);
        }
    }
    const onPassChange = (event) => {
        setPassword(event.target.value);
    }
    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    if(props.initialising){
        return (
            <div>
              <p>Initialising User...</p>
            </div>
          );
    }
    if (props.error) {
        return (
          <div>
            <p>Error: {error}</p>
          </div>
        );
    }
    if (props.user) {
        console.log(props.user)
        return (
          <div>
            <p>Current User: {props.user.email}</p>
            <button onClick={props.firebase.doSignOut}>Log out</button>
          </div>
        );
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={onEmailChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={onPassChange}
                    type="password"
                    placeholder="Password"
                />
                <button type="submit">
                    Sign In
                </button>
        
                {error && <p>{error.message}</p>}
            </form>
        </div>
    )
}

export default withFirebase(SignIn);