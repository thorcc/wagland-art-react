import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classes from './paragraph.module.css';

    

const Paragraph = props => {
    return(
        <div className={classes.Container}>
            <TextareaAutosize className={classes.TextArea}
            useCacheForDOMMeasurements
            onChange={event => props.handleTextInput(event.target.value, props.index)}  
            value={props.text} 
            />
        </div>
    )
}

export default Paragraph;