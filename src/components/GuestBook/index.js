import React, { useEffect, useState } from 'react';
import { withFirebase } from '../Firebase';
import classes from './style.module.css'; 
 

const GuestBook = props => {
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');



    useEffect(() => {
        const unsubscribe = props.firebase.guestBook.orderBy('date','desc').onSnapshot(async data => {
          const list = data.docs.map(comment => {
              return { ...comment.data(), date: comment.data().date.toDate().toLocaleDateString()}
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
               <div className={classes.Comment} key={comment.date}>
                    <div className={classes.Info}>
                        <div className={classes.Name}>{comment.name}</div>
                        <div className={classes.Date}>{comment.date}</div>
                    </div>
                    <div className={classes.Message}>{comment.message}</div>
               </div>
           ))}
        </div>
    )
}

export default withFirebase(GuestBook);