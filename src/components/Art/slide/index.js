import React, { useEffect } from 'react';
import classes from './style.module.css';

const Slide = props => {

    const NextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 18 18"><path fill="white" d="M9 3L7.94 4.06l4.19 4.19H3v1.5h9.13l-4.19 4.19L9 15l6-6z"/></svg>
    const Previcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 18 18"><path fill="white" d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"/></svg>
    const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 18 18"><path fill="white" d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>

    useEffect(() => {
        const handleKeydown = (event) => {
            if(event.keyCode === 27){
                props.hideSlide();
            }
        }
        
        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown',handleKeydown);
        }   
    }, []);

    return(
    <div className={classes.Container}>
        <img 
            className={classes.Img} 
            src={props.paintings[props.slideNo].imageUrl} 
            alt={props.paintings[props.slideNo].name} 
        />
        <div 
            className={classes.Close}
            onClick={props.hideSlide}
        >
            <CloseIcon />
        </div>
        <div 
            className={classes.Next}
            onClick={props.nextSlide}
        >
            <NextIcon  />
        </div>
        <div 
            className={classes.Prev}
            onClick={props.prevSlide}
        >
            <Previcon />
        </div>
    </div>
    )
}

export default Slide;