import React, { useState } from 'react';
import { withFirebase } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


const SignIn = props => {
    const [user, initialising, error] = useAuthState(props.firebase.auth);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
            await props.firebase.doSignInWithEmailAndPassword(email, password);
            setEmail('');
            setPassword('');
    }
    const onPassChange = (event) => {
        setPassword(event.target.value);
    }
    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    if(initialising){
        return (
            <div>
              <p>Initialising User...</p>
            </div>
          );
    }
    if (error) {
        return (
          <div>
            <p>Error: {error}</p>
          </div>
        );
    }
    if (user) {
        console.log(props.user)
        return (
          <div>
            <p>Current User: {user.email}</p>
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