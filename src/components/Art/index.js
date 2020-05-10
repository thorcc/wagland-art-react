import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import classes from './style.module.css';
import Slide from './slide';

const Art = props => {
    const [paintings, setPaintings] = useState([]);
    const [showSlide, setShowSlide] = useState(false);
    const [slideNo, setSlideNo] = useState(0);

    const nextSlide = () => {
        slideNo < paintings.length - 1 ? setSlideNo(slideNo + 1) : setSlideNo(0);
        console.log('nextSlide',slideNo)
    }
    const prevSlide = () => {
        slideNo > 0 ? setSlideNo(slideNo - 1) : setSlideNo(paintings.length - 1);
        console.log('prevSlide',slideNo);
    }
    const hideSlide = () => setShowSlide(false);


    useEffect(() => {  

        const getPaintings = async () => {
          const res = await props.firebase.paintings.get();
          const data = res.data().list;
          setPaintings(data);
          console.log(data);
        }
        getPaintings();
      },[]);

    const items = paintings.map((painting, index) => (
        <div 
            key={painting.id} 
            className={classes.divPainting}
            onClick={() => {
                if(window.innerWidth > 768){
                    setSlideNo(index);
                    setShowSlide(true);
                }
            }}
        >
            <div className={classes.name}>
                <p>{painting.name}</p>  
            </div>
            <img src={painting.imageUrl} />
        </div>           
    ))

    return(
        <div className={classes.paintings}>
            {items}
            {showSlide ? <Slide slideNo={slideNo} nextSlide={nextSlide} prevSlide={prevSlide} hideSlide={hideSlide} paintings={paintings} /> : null}
        </div>
    )
}

export default withFirebase(Art);