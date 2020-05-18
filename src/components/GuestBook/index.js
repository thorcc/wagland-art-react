import React, { useEffect, useState } from 'react';
import { withFirebase } from '../Firebase';
import classes from './style.module.css'; 
import { useAuthState } from 'react-firebase-hooks/auth';

 

const GuestBook = props => {
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');

    const [user, initialising, error] = useAuthState(props.firebase.auth);


    useEffect(() => {
        const unsubscribe = props.firebase.guestBook.orderBy('date','desc').onSnapshot(async data => {
          const list = data.docs.map(comment => {
              return { ...comment.data(), id: comment.id, date: comment.data().date.toDate().toLocaleDateString()}
          })
          setComments(list);
        });

        return () => unsubscribe();
      }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.firebase.guestBook.add({
          date: new Date(),
          name: name,
          mail: mail,
          message: message
        })
        setMessage('');
        setName('');
        setMail('');
    }

    const removeComment = (id) => {
        props.firebase.guestBook.doc(id).delete();
    }

    return(
        <div>
            <form onSubmit={(evt) => handleSubmit(evt)} className={classes.Form}>
                <textarea required placeholder="Write your message here*" value={message} onChange={evt => setMessage(evt.target.value)} />
                <div className={classes.InpInfo}>
                    <div>
                        <input required placeholder="Name*" value={name} onChange={evt => setName(evt.target.value)}/>
                        <input placeholder="Email" value={mail} onChange={evt => setMail(evt.target.value)}/>
                    </div>
                    <button className={classes.Button}>Send</button>
                </div>
            </form>

           {comments.map((comment) => (
               <div className={classes.Comment} key={comment.id}>
                    <div className={classes.Info}>
                        <div className={classes.Name}>{comment.name}</div>
                        <div className={classes.Date}>{comment.date}</div>
                        {user ? <button onClick={() => removeComment(comment.id)} className={classes.Remove}>X</button> : null}
                    </div>
                    <div className={classes.Message}>{comment.message}</div>
               </div>
           ))}
        </div>
    )
}

export default withFirebase(GuestBook);