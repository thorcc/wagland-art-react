import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import classes from './style.module.css';

const Art = props => {
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {  

        const getPaintings = async () => {
          const res = await props.firebase.paintings.get();
          const data = res.data().list;
          setPaintings(data);
        }
        getPaintings();
      },[]);


    return(
        <div className={classes.paintings}>
            {paintings.map(painting => (
                <div className={classes.divPainting}>
                    <div className={classes.name}>
                        <p>{painting.name}</p>  
                    </div>
                    <img src={painting.imageUrl} />
                </div>           
            ))}
        </div>
    )
}

export default withFirebase(Art);